const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const envPath = '/home/u672716419/domains/latelier-8.fr/secure/.env';
const localDataFile = path.join(__dirname, 'instagram_data.json');

const result = dotenv.config({ path: envPath });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: true
}));

const updateEnvFile = (key, value) => {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    envConfig[key] = value;
    const updatedEnvContent = Object.keys(envConfig).map(k => `${k}=${envConfig[k]}`).join('\n');
    fs.writeFileSync(envPath, updatedEnvContent);
};

// Variable globale pour stocker la fonction fetch et renewInstagramToken
let fetch;
let renewInstagramToken;

(async () => {
    fetch = (await import('node-fetch')).default;

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    // Définir la fonction de renouvellement du token en dehors pour qu'elle soit accessible au cron
    renewInstagramToken = async () => {
        const longLivedToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Toujours lire depuis process.env
        const renewTokenUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedToken}`;

        try {
            const renewTokenResponse = await fetch(renewTokenUrl);
            const renewTokenData = await renewTokenResponse.json();
            const renewedToken = renewTokenData.access_token;

            console.log('Nouveau jeton d\'accès à long terme obtenu');
            updateEnvFile('INSTAGRAM_ACCESS_TOKEN', renewedToken);
            
            // Mettre à jour aussi dans process.env pour utilisation immédiate
            process.env.INSTAGRAM_ACCESS_TOKEN = renewedToken;

            return renewedToken;
        } catch (error) {
            console.error('Erreur lors du renouvellement du jeton d\'accès à long terme :', error);
            return longLivedToken;
        }
    };

    // Renouveler le token au démarrage
    const tokenToUse = await renewInstagramToken();

    app.get('/instagram/posts', async (req, res) => {
        console.log('Requête reçue sur /instagram/posts');
        try {
            let allPosts = [];
            // Toujours utiliser le token le plus récent depuis process.env
            const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
            let url = `https://graph.instagram.com/${userId}/media?fields=id,caption,thumbnail_url,media_url,permalink&access_token=${currentToken}&limit=100`;

            while (url) {
                const response = await fetch(url);
                if (!response.ok) {
                    const errorResponse = await response.json().catch(() => ({}));
                    console.error(`Erreur API Instagram : ${response.status} - ${response.statusText}`, errorResponse);
                    throw new Error('API Instagram indisponible');
                }

                const data = await response.json();
                allPosts = allPosts.concat(data.data);

                // Vérifie s'il y a une page suivante
                url = data.paging?.next || null;
            }

            // CORRECTION PRINCIPALE : Mise à jour systématique avec horodatage
            const dataToSave = { 
                data: allPosts,
                lastUpdate: new Date().toISOString() // Ajouter un timestamp
            };

            let shouldUpdateLocalData = true;
            
            if (fs.existsSync(localDataFile)) {
                const localData = JSON.parse(fs.readFileSync(localDataFile));
                
                // Comparer uniquement les IDs et timestamps pour détecter de vrais changements
                const localIds = (localData.data || []).map(p => p.id).sort();
                const newIds = allPosts.map(p => p.id).sort();
                
                // Mise à jour si : nouveaux posts, posts supprimés, ou plus de 1 heure depuis la dernière mise à jour
                const lastUpdate = localData.lastUpdate ? new Date(localData.lastUpdate) : new Date(0);
                const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                
                shouldUpdateLocalData = 
                    JSON.stringify(localIds) !== JSON.stringify(newIds) || // Changement de posts
                    lastUpdate < oneHourAgo; // Ou plus d'1h depuis la dernière mise à jour
            }

            if (shouldUpdateLocalData) {
                console.log('Mise à jour des données locales.');
                fs.writeFileSync(localDataFile, JSON.stringify(dataToSave, null, 2));
            } else {
                console.log('Les données locales sont déjà à jour.');
            }

            // Renvoyer uniquement les posts (sans le timestamp) au client
            res.json({ data: allPosts });
        } catch (error) {
            console.error('Erreur lors de la récupération des publications Instagram :', error);
            
            // En cas d'erreur, essayer de renvoyer les données locales
            if (fs.existsSync(localDataFile)) {
                console.log('Utilisation des données locales en fallback');
                const localData = JSON.parse(fs.readFileSync(localDataFile));
                res.json({ data: localData.data || [] });
            } else {
                res.status(500).json({ error: 'Échec de récupération des publications Instagram' });
            }
        }
    });

    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})();

// CRON pour renouveler le token tous les 30 jours
cron.schedule('0 0 */30 * *', async () => {
    console.log('Tâche CRON : Renouvellement du jeton d\'accès à long terme');
    if (renewInstagramToken) {
        await renewInstagramToken();
    } else {
        console.error('La fonction renewInstagramToken n\'est pas encore disponible');
    }
});

// NOUVEAU CRON : Forcer la mise à jour des données Instagram toutes les heures
cron.schedule('0 * * * *', async () => {
    console.log('Tâche CRON : Mise à jour forcée des données Instagram');
    if (fetch) {
        try {
            // Faire une requête à notre propre endpoint pour déclencher la mise à jour
            const response = await fetch(`http://localhost:${port}/instagram/posts`);
            if (response.ok) {
                console.log('Mise à jour forcée réussie');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour forcée :', error);
        }
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

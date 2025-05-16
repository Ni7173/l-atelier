const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

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

(async () => {
    const fetch = (await import('node-fetch')).default;

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    const renewInstagramToken = async () => {
        const longLivedToken = accessToken;
        const renewTokenUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedToken}`;

        try {
            const renewTokenResponse = await fetch(renewTokenUrl);
            const renewTokenData = await renewTokenResponse.json();
            const renewedToken = renewTokenData.access_token;

            console.log('Nouveau jeton d\'accès à long terme :', renewedToken);
            updateEnvFile('INSTAGRAM_ACCESS_TOKEN', renewedToken);

            return renewedToken;
        } catch (error) {
            console.error('Erreur lors du renouvellement du jeton d\'accès à long terme :', error);
        }

        return longLivedToken;
    };

    const tokenToUse = await renewInstagramToken();

    app.get('/instagram/posts', async (req, res) => {
        console.log('Requête reçue sur /instagram/posts');
        try {
            let allPosts = [];
            let url = `https://graph.instagram.com/${userId}/media?fields=id,caption,thumbnail_url,media_url,permalink&access_token=${tokenToUse}&limit=100`;

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

            let shouldUpdateLocalData = true;
            if (fs.existsSync(localDataFile)) {
                const localData = JSON.parse(fs.readFileSync(localDataFile));
                shouldUpdateLocalData = JSON.stringify(localData) !== JSON.stringify({ data: allPosts });
            }

            if (shouldUpdateLocalData) {
                console.log('Mise à jour des données locales.');
                fs.writeFileSync(localDataFile, JSON.stringify({ data: allPosts }, null, 2));
            } else {
                console.log('Les données locales sont déjà à jour.');
            }

            res.json({ data: allPosts });
        } catch (error) {
            console.error('Erreur lors de la récupération des publications Instagram :', error, Date.now);
            res.status(500).json({ error: 'Échec de récupération des publications Instagram' });
        }
    });

    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})();

const cron = require('node-cron');

cron.schedule('0 0 */30 * *', async () => {
    console.log('Tâche CRON : Renouvellement du jeton d\'accès à long terme');
    await renewInstagramToken();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

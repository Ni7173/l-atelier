const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const envPath = '/home/u672716419/domains/latelier-8.fr/secure/.env';

const result = dotenv.config({ path: envPath });


const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: true
}));

const updateEnvFile = (key, value) => {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));

    envConfig[key] = value;  // Mettre à jour la valeur du jeton

    const updatedEnvContent = Object.keys(envConfig).map(k => `${k}=${envConfig[k]}`).join('\n'); // Construire le contenu mis à jour du fichier .env

    fs.writeFileSync(envPath, updatedEnvContent); // Écrire le contenu mis à jour dans le fichier .env
};

(async () => {
    const fetch = (await import('node-fetch')).default;

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    const renewInstagramToken = async () => {
        const longLivedToken = accessToken; // Récupérez le jeton actuel
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

    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${tokenToUse}`;

    console.log("url créée " + url)

    app.get('/instagram/posts', async (req, res) => {
        console.log('Requête reçue sur /instagram/posts');
        try {
            const response = await fetch(url);
            const data = await response.json();
            res.json(data);
            // console.log('Données récupérées depuis Instagram :', data);
        } catch (error) {
            console.error('Erreur lors de la récupération des publications Instagram :', error);
            res.status(500).json({ error: 'Échec de récupération des publications Instagram' });
        }
    });

    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})();

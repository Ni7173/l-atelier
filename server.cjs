const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: '/home/u672716419/domains/latelier-8.fr/secure/.env' });

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

(async () => {
    const fetch = (await import('node-fetch')).default;

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`;

    app.get('/instagram/posts', async (req, res) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des publications Instagram :', error);
            res.status(500).json({ error: 'Échec de récupération des publications Instagram' });
        }
    });

    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
})();

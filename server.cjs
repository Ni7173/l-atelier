require('dotenv').config()({ path: '/home/u672716419/domains/latelier-8.fr/secure/.env' });
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Importation dynamique de node-fetch
import('node-fetch').then((fetch) => {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;
    const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`;

    app.get('/instagram/posts', async (req, res) => {
        try {
            const response = await fetch.default(url); // Utilisation de fetch.default()
            const data = await response.json();
            res.json(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des publications Instagram :', error);
            res.status(500).json({ error: 'Échec de récupération des publications Instagram' });
        }
    });
}).catch((err) => {
    console.error('Erreur lors de l\'importation de node-fetch :', err);
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});

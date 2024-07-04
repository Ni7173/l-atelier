import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les JSON
app.use(bodyParser.json());

// Route pour échanger le code d'autorisation contre un jeton d'accès
app.post('/exchange-code', async (req, res) => {
    const authorizationCode = req.body.code;

    if (authorizationCode) {
        const params = new URLSearchParams();
        params.append('client_id', process.env.INSTAGRAM_CLIENT_ID);
        params.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', process.env.INSTAGRAM_REDIRECT_URI);
        params.append('code', authorizationCode);

        try {
            const response = await fetch('https://api.instagram.com/oauth/access_token', {
                method: 'POST',
                body: params
            });
            const data = await response.json();
            if (data.access_token) {
                res.json({ success: true, data });
            } else {
                res.json({ success: false, error: data.error_message });
            }
        } catch (error) {
            res.status(500).json({ success: false, error: 'Server error' });
        }
    } else {
        res.status(400).json({ success: false, error: 'Authorization code not provided' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

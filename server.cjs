const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const envPath = "/home/u672716419/domains/latelier-8.fr/secure/.env";
const localDataFile = path.join(__dirname, "instagram_data.json");
const publicDataFile =
	"/home/u672716419/domains/latelier-8.fr/public_html/instagram_data.json";

const result = dotenv.config({ path: envPath });

const updateEnvFile = (key, value) => {
	const envConfig = dotenv.parse(fs.readFileSync(envPath));
	envConfig[key] = value;
	const updatedEnvContent = Object.keys(envConfig)
		.map((k) => `${k}=${envConfig[k]}`)
		.join("\n");
	fs.writeFileSync(envPath, updatedEnvContent);
};

let fetch;
let renewInstagramToken;

// Fonction pour mettre à jour les données Instagram
const updateInstagramData = async () => {
	console.log("Début de la mise à jour des données Instagram...");

	try {
		const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
		const userId = process.env.INSTAGRAM_USER_ID;

		let allPosts = [];
		let url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,thumbnail_url,media_url,permalink&access_token=${accessToken}&limit=100`;

		// Récupérer tous les posts avec pagination
		while (url) {
			const response = await fetch(url);
			if (!response.ok) {
				const errorResponse = await response.json().catch(() => ({}));
				console.error(
					`Erreur API Instagram : ${response.status} - ${response.statusText}`,
					errorResponse,
				);
				throw new Error("API Instagram indisponible");
			}

			const data = await response.json();
			allPosts = allPosts.concat(data.data);
			url = data.paging?.next || null;
		}

		// Préparer les données avec timestamp
		const dataToSave = {
			data: allPosts,
			lastUpdate: new Date().toISOString(),
		};

		// Sauvegarder dans le dossier du serveur (backup)
		fs.writeFileSync(localDataFile, JSON.stringify(dataToSave, null, 2));
		console.log(`✓ Données sauvegardées dans ${localDataFile}`);

		// Sauvegarder dans le dossier public (accessible au web)
		fs.writeFileSync(publicDataFile, JSON.stringify(dataToSave, null, 2));
		console.log(`✓ Données copiées vers ${publicDataFile}`);

		console.log(`✓ ${allPosts.length} posts Instagram mis à jour avec succès`);

		return allPosts.length;
	} catch (error) {
		console.error(
			"❌ Erreur lors de la mise à jour des données Instagram:",
			error,
		);

		// En cas d'erreur, essayer de copier le backup local vers public
		if (fs.existsSync(localDataFile)) {
			try {
				const backupData = fs.readFileSync(localDataFile);
				fs.writeFileSync(publicDataFile, backupData);
				console.log("⚠️ Utilisation du backup local");
			} catch (copyError) {
				console.error("❌ Impossible de copier le backup:", copyError);
			}
		}

		throw error;
	}
};

(async () => {
	fetch = (await import("node-fetch")).default;

	// Fonction de renouvellement du token
	renewInstagramToken = async () => {
		const longLivedToken = process.env.INSTAGRAM_ACCESS_TOKEN;
		const renewTokenUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${longLivedToken}`;

		try {
			const renewTokenResponse = await fetch(renewTokenUrl);
			const renewTokenData = await renewTokenResponse.json();
			const renewedToken = renewTokenData.access_token;

			console.log("✓ Nouveau jeton d'accès Instagram obtenu");
			updateEnvFile("INSTAGRAM_ACCESS_TOKEN", renewedToken);
			process.env.INSTAGRAM_ACCESS_TOKEN = renewedToken;

			return renewedToken;
		} catch (error) {
			console.error("❌ Erreur lors du renouvellement du jeton:", error);
			return longLivedToken;
		}
	};

	// Renouveler le token au démarrage
	await renewInstagramToken();

	// Mettre à jour les données au démarrage
	console.log("🚀 Mise à jour initiale des données Instagram...");
	try {
		await updateInstagramData();
	} catch (error) {
		console.error("❌ Échec de la mise à jour initiale");
	}

	console.log(
		"✓ Serveur Instagram prêt - Les données seront mises à jour toutes les heures",
	);
})();

// CRON : Renouveler le token tous les 30 jours
cron.schedule("0 0 */30 * *", async () => {
	console.log("⏰ CRON : Renouvellement du jeton d'accès Instagram");
	if (renewInstagramToken) {
		await renewInstagramToken();
	}
});

// CRON : Mettre à jour les données toutes les heures
cron.schedule("0 * * * *", async () => {
	console.log("⏰ CRON : Mise à jour des données Instagram");
	if (fetch) {
		try {
			await updateInstagramData();
		} catch (error) {
			console.error("❌ Échec de la mise à jour programmée");
		}
	}
});

process.on("uncaughtException", (err) => {
	console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("❌ Unhandled Rejection:", reason);
});

console.log("📱 Serveur Instagram démarré en mode fichier JSON");
console.log(`📂 Fichier local: ${localDataFile}`);
console.log(`🌐 Fichier public: ${publicDataFile}`);
console.log("⏰ Mise à jour automatique: toutes les heures");

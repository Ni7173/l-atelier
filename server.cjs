const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const envPath = "/home/u672716419/domains/latelier-8.fr/secure/.env";
const localDataFile = path.join(__dirname, "instagram_data.json");
const publicDataFile =
	"/home/u672716419/domains/latelier-8.fr/public_html/instagram_data.json";

dotenv.config({ path: envPath });

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

const updateInstagramData = async () => {
	console.log("Début de la mise à jour des données Instagram...");

	try {
		const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

		let allPosts = [];
		let url = `https://graph.instagram.com/v25.0/me/media?fields=id,caption,media_type,thumbnail_url,media_url,permalink&access_token=${accessToken}&limit=100`;

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

		const dataToSave = {
			data: allPosts,
			lastUpdate: new Date().toISOString(),
		};

		fs.writeFileSync(localDataFile, JSON.stringify(dataToSave, null, 2));
		console.log(`✓ Données sauvegardées dans ${localDataFile}`);

		fs.writeFileSync(publicDataFile, JSON.stringify(dataToSave, null, 2));
		console.log(`✓ Données copiées vers ${publicDataFile}`);

		console.log(`✓ ${allPosts.length} posts Instagram mis à jour avec succès`);

		return allPosts.length;
	} catch (error) {
		console.error(
			"❌ Erreur lors de la mise à jour des données Instagram:",
			error,
		);

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

	renewInstagramToken = async () => {
		const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
		const renewUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;

		try {
			const response = await fetch(renewUrl);
			const data = await response.json();

			if (!response.ok || !data.access_token) {
				console.error("❌ Échec du renouvellement du token:", data);
				console.log("⚠️ Conservation du token actuel");
				return currentToken;
			}

			const renewedToken = data.access_token;
			console.log("✓ Token Instagram renouvelé avec succès");
			updateEnvFile("INSTAGRAM_ACCESS_TOKEN", renewedToken);
			process.env.INSTAGRAM_ACCESS_TOKEN = renewedToken;
			return renewedToken;
		} catch (error) {
			console.error("❌ Erreur lors du renouvellement du token:", error);
			return currentToken;
		}
	};

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

// CRON : Renouveler le token le 1er de chaque mois (bien dans la fenêtre des 60 jours)
cron.schedule("0 0 1 * *", async () => {
	console.log("⏰ CRON : Renouvellement du token Instagram");
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

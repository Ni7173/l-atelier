const apiUrl = "/instagram/posts";
const localFallbackUrl = "../instagram_data.json";
const CACHE_KEY = "instagram_posts_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure en millisecondes

// Fonction pour afficher les posts Instagram (définie en premier pour éviter ReferenceError)
function displayInstagramFeed(data) {
	const feedContainer = document.getElementById("ig-feed");

	// Normaliser le format des données (gérer l'ancien et le nouveau format)
	// Si data contient directement un tableau, l'envelopper dans {data: [...]}
	// Si data.data existe déjà, le garder tel quel
	if (Array.isArray(data)) {
		data = { data: data };
	} else if (!data.data) {
		console.error("Format de données invalide:", data);
		return;
	}

	// Réinitialiser le compteur de posts affichés
	let postsDisplayed = 0;

	let initialPostsToShow = 4;
	let postsToAdd = 2;

	switch (true) {
		case window.innerWidth >= 599 && window.innerWidth <= 1399:
			initialPostsToShow = 6;
			postsToAdd = 3;
			break;
		case window.innerWidth > 1399:
			initialPostsToShow = 10;
			postsToAdd = 5;
			break;
	}

	window.addEventListener("resize", () => {
		switch (true) {
			case window.innerWidth < 599:
				initialPostsToShow = 4;
				postsToAdd = 2;
				break;
			case window.innerWidth >= 599 && window.innerWidth <= 1399:
				initialPostsToShow = 6;
				postsToAdd = 3;
				break;
			case window.innerWidth > 1399:
				initialPostsToShow = 10;
				postsToAdd = 5;
				break;
		}
	});

	const showMoreButton = document.querySelector(".ig__show__more__button");

	const displayPosts = (postsToShow) => {
		const posts = data.data.slice(postsDisplayed, postsDisplayed + postsToShow);

		posts.forEach((post, index) => {
			const postElement = document.createElement("div");
			postElement.className = "instagram-post";
			postElement.innerHTML = `
                <a class="absoluted" href="${post.permalink}" target="_blank">
                </a>
                 ${
										post.permalink.includes("reel")
											? `<img loading="lazy" class="object__fit-cover ig_post_media" src="${post.thumbnail_url}" alt="${post.caption || "post instagram"} l'Atelier 8" />`
											: `<img loading="lazy" class="object__fit-cover ig_post_media" src="${post.media_url}" alt="${post.caption || "post instagram"} l'Atelier 8" />`
									}
                <img loading="lazy" class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
            `;
			feedContainer.appendChild(postElement);

			setTimeout(() => {
				postElement.classList.add("show");
			}, 100 * index);
		});

		postsDisplayed += postsToShow;

		if (postsDisplayed >= data.data.length) {
			showMoreButton.classList.add("hidden");
		}
	};

	displayPosts(initialPostsToShow);

	// Remplacer l'event listener au lieu de l'ajouter plusieurs fois
	const newShowMoreButton = showMoreButton.cloneNode(true);
	showMoreButton.parentNode.replaceChild(newShowMoreButton, showMoreButton);

	newShowMoreButton.addEventListener("click", () => {
		displayPosts(postsToAdd);
	});
}

// Fonction pour récupérer le cache
const getCache = () => {
	try {
		const cached = localStorage.getItem(CACHE_KEY);
		if (cached) {
			const { data, timestamp } = JSON.parse(cached);
			const now = Date.now();

			// Retourner le cache s'il a moins d'1 heure
			if (now - timestamp < CACHE_DURATION) {
				return data;
			}
		}
	} catch (error) {
		console.error("Erreur lecture cache:", error);
	}
	return null;
};

// Fonction pour sauvegarder le cache
const setCache = (data) => {
	try {
		localStorage.setItem(
			CACHE_KEY,
			JSON.stringify({
				data: data,
				timestamp: Date.now(),
			}),
		);
	} catch (error) {
		console.error("Erreur sauvegarde cache:", error);
	}
};

// Afficher immédiatement le cache si disponible
const cachedData = getCache();
if (cachedData) {
	console.log("Affichage des posts en cache...");
	displayInstagramFeed(cachedData);
}

// Puis charger les données fraîches en arrière-plan
fetch(apiUrl)
	.then((response) => {
		if (!response.ok) {
			throw new Error("Network response was not ok " + response.statusText);
		}
		return response.json();
	})
	.then((data) => {
		// Sauvegarder dans le cache
		setCache(data);

		// Réafficher seulement si c'est différent du cache
		if (!cachedData || JSON.stringify(cachedData) !== JSON.stringify(data)) {
			console.log("Mise à jour avec données fraîches");
			// Effacer l'ancien contenu avant de réafficher
			const feedContainer = document.getElementById("ig-feed");
			if (feedContainer) {
				feedContainer.innerHTML = "";
			}
			displayInstagramFeed(data);
		} else {
			console.log("Cache à jour, pas de rechargement");
		}
	})
	.catch((error) => {
		console.error("Error fetching Instagram posts from API:", error);

		// Si on n'a pas de cache, essayer le fallback local
		if (!cachedData) {
			console.log("Tentative de récupération des données locales...");
			fetch(localFallbackUrl)
				.then((response) => {
					if (!response.ok) {
						throw new Error(
							"Network response was not ok " + response.statusText,
						);
					}
					return response.json();
				})
				.then((localData) => {
					console.log("Données locales utilisées.");
					console.log("Format reçu:", localData);

					// Normaliser le format : le nouveau format du serveur inclut {data: [...], lastUpdate: "..."}
					// L'ancien format était juste {data: [...]}
					let postsData;

					if (localData.data && Array.isArray(localData.data)) {
						// Nouveau ou ancien format avec data
						postsData = { data: localData.data };
					} else if (Array.isArray(localData)) {
						// Format direct (tableau)
						postsData = { data: localData };
					} else {
						console.error("Format de données local invalide");
						throw new Error("Format invalide");
					}

					setCache(postsData);
					displayInstagramFeed(postsData);
				})
				.catch((localError) => {
					console.error(
						"Error fetching Instagram posts from local JSON:",
						localError,
					);

					const feedSection = document.getElementById("ig-content");
					if (feedSection) {
						feedSection.style.display = "none";
					}

					const showMoreButton = document.querySelector(
						".ig__show__more__button",
					);
					if (showMoreButton) {
						showMoreButton.classList.add("hidden");
					}
				});
		} else {
			console.log("Utilisation du cache suite à l'erreur API");
		}
	});

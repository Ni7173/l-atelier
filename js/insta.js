const apiUrl = '../instagram/posts';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {

        const feedContainer = document.getElementById('ig-feed');
        data.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            postElement.innerHTML = `
                <a class="absoluted" href="${post.permalink}" target="_blank">
                <img class="object__fit-cover" src="${post.media_url}" alt="${post.caption} post instagram l'Atelier 8" />
                </a>
                <img class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
            `;
            feedContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching Instagram posts:', error);

        // ajout d'un message d'erreur dans le feed instagram
        const errorContainer = document.getElementById('ig-error-container');
        errorContainer.innerHTML = '<p style="text-align: center;"><i>Une erreur est survenue lors de la récupération des publications Instagram. Veuillez rafraîchir votre page.</i></p>'
    });    
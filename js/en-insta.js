const apiUrl = '../instagram/posts';
const localFallbackUrl = '../instagram_data.json';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        displayInstagramFeed(data);
    })
    .catch(error => {
        console.error('Error fetching Instagram posts from API:', error);

        console.log('Tentative de récupération des données locales...');
        fetch(localFallbackUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Données locales utilisées.');
                console.log(data);
                displayInstagramFeed(data);
            })
            .catch(localError => {
                console.error('Error fetching Instagram posts from local JSON:', localError);

                const feedSection = document.getElementById('ig-content');
                if (feedSection) {
                    feedSection.style.display = "none";
                }

                const errorContainer = document.getElementById('ig-error-container');
                errorContainer.innerHTML = '<p style="text-align: center;"><i>Error fetching instagram posts, please refresh your page to see the content.</i></p>';

                const showMoreButton = document.querySelector('.ig__show__more__button');
                if (showMoreButton) {
                    showMoreButton.classList.add('hidden');
                }
            });
    });

// Fonction pour afficher les posts Instagram
const displayInstagramFeed = (data) => {
    const feedContainer = document.getElementById('ig-feed');

    let postsDisplayed = 0;

    let initialPostsToShow = 4;
    let postsToAdd = 2;

    switch (true) {
        case (window.innerWidth >= 599 && window.innerWidth <= 1399):
            initialPostsToShow = 6;
            postsToAdd = 3;
            break;
        case (window.innerWidth > 1399):
            initialPostsToShow = 10;
            postsToAdd = 5;
            break;
    }

    window.addEventListener('resize', () => {
        switch (true) {
            case (window.innerWidth < 599):
                initialPostsToShow = 4;
                postsToAdd = 2;
                break;
            case (window.innerWidth >= 599 && window.innerWidth <= 1399):
                initialPostsToShow = 6;
                postsToAdd = 3;
                break;
            case (window.innerWidth > 1399):
                initialPostsToShow = 10;
                postsToAdd = 5;
                break;
        }
    });

    const showMoreButton = document.querySelector('.ig__show__more__button');

    const displayPosts = (postsToShow) => {
        const posts = data.data.slice(postsDisplayed, postsDisplayed + postsToShow);

        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            postElement.innerHTML = `
                <a class="absoluted" href="${post.permalink}" target="_blank">
                 ${post.permalink.includes('reel')
                    ? `<video muted class="object__fit-cover ig_post_media">
                        <source src="${post.media_url}" type="video/mp4">
                        Votre navigateur ne supporte pas les vidéos HTML5.
                    </video>`
                    : `<img loading="lazy" class="object__fit-cover ig_post_media" src="${post.media_url}" alt="${post.caption} post instagram l'Atelier 8" />`
                }
                </a>
                <img loading="lazy" class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
            `;
            feedContainer.appendChild(postElement);

            setTimeout(() => {
                postElement.classList.add('show');
            }, 100 * index);
        });

        postsDisplayed += postsToShow;

        if (postsDisplayed >= data.data.length) {
            showMoreButton.classList.add('hidden');
        }
    };
    displayPosts(initialPostsToShow);

    showMoreButton.addEventListener('click', () => {
        displayPosts(postsToAdd);
    });
};

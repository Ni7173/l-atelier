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

        let postsDisplayed = 0;

        let initialPostsToShow = 4;
        let postsToAdd = 2;

        if (window.innerWidth > 599) {
            initialPostsToShow = 6;
            postsToAdd = 3;
        }

        if (window.innerWidth > 1399) {
            initialPostsToShow = 10;
            postsToAdd = 5;
        }


        window.addEventListener('resize', () => {
            if (window.innerWidth < 599) {
                initialPostsToShow = 4;
                postsToAdd = 2;
            }

            if (window.innerWidth > 599) {
                initialPostsToShow = 6;
                postsToAdd = 3;
            }

            if (window.innerWidth > 1399) {
                initialPostsToShow = 10;
                postsToAdd = 5;
            }
        })



        const showMoreButton = document.querySelector('.ig__show__more__button');

        const displayPosts = (postsToShow) => {

            const posts = data.data.slice(postsDisplayed, postsDisplayed + postsToShow);

            posts.forEach(post => {
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

            postsDisplayed += postsToShow;

            // Si tous les posts sont affichés, on cache le bouton
            if (postsDisplayed >= data.data.length) {
                showMoreButton.classList.add('hidden');
            }
        };
        displayPosts(initialPostsToShow);

        showMoreButton.addEventListener('click', () => {
            displayPosts(postsToAdd);
        });
    })
    .catch(error => {
        console.error('Error fetching Instagram posts:', error);

        // ajout d'un message d'erreur dans le feed instagram
        const errorContainer = document.getElementById('ig-error-container');
        errorContainer.innerHTML = '<p style="text-align: center;"><i>Error fetching instagram posts, please refresh your page to see the content.</i></p>'
    });    
// const apiUrl = '../instagram/posts';

// fetch(apiUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {

//         const feedContainer = document.getElementById('ig-feed');
//         data.data.forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.className = 'instagram-post';
//             postElement.innerHTML = `
//                 <a class="absoluted" href="${post.permalink}" target="_blank">
//                 <img class="object__fit-cover" src="${post.media_url}" alt="${post.caption} post instagram l'Atelier 8" />
//                 </a>
//                 <img class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
//             `;
//             feedContainer.appendChild(postElement);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching Instagram posts:', error);

//         // ajout d'un message d'erreur dans le feed instagram
//         const errorContainer = document.getElementById('ig-error-container');
//         errorContainer.innerHTML = '<p style="text-align: center;"><i>Une erreur est survenue lors de la récupération des publications Instagram. Veuillez rafraîchir votre page.</i></p>'
//     });


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
    })
    .catch(error => {
        console.error('Error fetching Instagram posts:', error);

        // ajout d'un message d'erreur dans le feed instagram
        const errorContainer = document.getElementById('ig-error-container');
        errorContainer.innerHTML = '<p style="text-align: center;"><i>Une erreur est survenue lors de la récupération des publications Instagram. Veuillez rafraîchir votre page.</i></p>'

        // retrait du bouton show more
        const showMoreButton = document.querySelector('.ig__show__more__button');
        console.log(showMoreButton)
        if (showMoreButton) {
            showMoreButton.classList.add('hidden');
        }
    });    

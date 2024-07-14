// const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`;


// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         const feedContainer = document.getElementById('ig-feed');
//         data.data.forEach(post => {
//             const postElement = document.createElement('div');
//             postElement.className = 'instagram-post';
//             postElement.innerHTML = `
//                     <a class="absoluted" href="${post.permalink}" target="_blank">
//                     <img class="object__fit-cover" src="${post.media_url}" alt="${post.caption}" />
//                     </a>
//                     <img class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
//                 `;
//             feedContainer.appendChild(postElement);
//         });
//     })
//     .catch(error => console.error('Error fetching Instagram posts:', error));

const apiUrl = '/instagram/posts';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const feedContainer = document.getElementById('ig-feed');
        data.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            postElement.innerHTML = `
                <a class="absoluted" href="${post.permalink}" target="_blank">
                <img class="object__fit-cover" src="${post.media_url}" alt="${post.caption}" />
                </a>
                <img class="ig__post__icon" src="../img/INSTA.svg" alt="instagram icon"/>
            `;
            feedContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching Instagram posts:', error));

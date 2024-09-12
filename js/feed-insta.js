const accessToken = 'token';
const userId = 'id';
const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink&access_token=${accessToken}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const feedContainer = document.getElementById('ig-feed');
        data.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            postElement.innerHTML = `
                        <a href="${post.permalink}" target="_blank">
                            <img src="${post.media_url}" alt="${post.caption}" />
                        </a>
                    `;
            feedContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('Error fetching Instagram posts:', error));
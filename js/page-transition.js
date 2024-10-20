function loadContent(url, addToHistory = true) {
    document.querySelector('#content').classList.add('hidden');

    setTimeout(() => {
        fetch(url)
            .then(response => response.text())  // Obtenir le texte HTML de la réponse
            .then(html => {

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const newContent = doc.querySelector('#content');
                const content = document.querySelector('#content');

                if (newContent) {
                    content.innerHTML = newContent.innerHTML;
                }

                if (addToHistory) {
                    history.pushState(null, null, url);
                }

                content.classList.remove('hidden');

                const contentTitle = doc.title || "No Title";
                document.title = contentTitle;
            }).catch(error => {
                console.error("Erreur lors du chargement de la page :", error);
                document.querySelector('#content').classList.remove('hidden');
                alert("Erreur lors du chargement de la page. Veuillez réessayer.");
            })
    }, 400);
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.href;

        const currentUrlNoHash = location.href.split('#')[0];
        const newUrlNoHash = url.split('#')[0];

        if (newUrlNoHash === currentUrlNoHash) {
            return;
        }

        loadContent(url);
    });
});

window.addEventListener('popstate', function () {
    loadContent(location.href, false);
});
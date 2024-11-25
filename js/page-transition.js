function loadContent(url, addToHistory = true) {
    document.querySelector('#content').classList.add('hidden');

    setTimeout(() => {
        fetch(url)
            .then(response => response.text())
            .then(html => {

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const docHead = doc.querySelector('head')

                const newContent = doc.querySelector('#content');
                const content = document.querySelector('#content');

                if (newContent) {

                    filterAssets(docHead, 'link[rel="stylesheet"]', 'css');
                    filterAssets(docHead, 'script', 'js');

                    content.innerHTML = newContent.innerHTML;
                }

                if (addToHistory) {
                    history.pushState(null, null, url);
                }

                content.classList.remove('hidden');

                const contentPageTitle = doc.title || "No Title";
                document.title = contentPageTitle;

                setUpDynamicNavigation();

            }).catch(error => {
                console.error("Erreur lors du chargement de la page :", error);
                document.querySelector('#content').classList.remove('hidden');
                alert("Erreur lors du chargement de la page. Veuillez réessayer.");
            })
    }, 600);
}

function filterAssets(docHead, selector, type) {
    const currentAssets = Array.from(document.querySelectorAll(selector));
    const newAssets = Array.from(docHead.querySelectorAll(selector));           // Nouveaux assets (CSS/JS)
    const head = document.querySelector('head');

    const currentHrefs = new Set(currentAssets.map(asset => type === 'css' ? asset.href : asset.src));
    const newHrefs = new Set(newAssets.map(asset => type === 'css' ? asset.href : asset.src));

    // retire les anciens fichiers non utiles
    currentAssets.forEach(asset => {
        const assetUrl = type === 'css' ? asset.href : asset.src;
        if (!newHrefs.has(assetUrl)) {
            console.log("anciens fichiers inutiles :", assetUrl)
            asset.remove();
        }
    });

    // retire les nouveaux fichiers déjà présents
    newAssets.forEach(asset => {
        const assetUrl = type === 'css' ? asset.href : asset.src;
        if (currentHrefs.has(assetUrl)) {
            console.log("nouveaux fichiers déjà présents :", assetUrl)
            asset.remove();
        }
    });



    newAssets.forEach(asset => {
        const assetUrl = type === 'css' ? asset.href : asset.src;
        if (!currentHrefs.has(assetUrl)) {
            if (type === 'css') {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = asset.href;
                head.appendChild(newLink);
            } else if (type === 'js') {
                const newScript = document.createElement('script');
                newScript.src = asset.src;
                newScript.async = true;
                head.appendChild(newScript);
            }
        }
    });
}




const setUpDynamicNavigation = () => {
    const samePagesLinks = Array.from(document.querySelectorAll('.same-page-link'));

    samePagesLinks.forEach(link => {
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
}

setUpDynamicNavigation();


window.addEventListener('popstate', function () {
    loadContent(location.href, false);
});

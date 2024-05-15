function menuMobile() {
    const btn = document.querySelector('.burger');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.navbar a');

    btn.addEventListener('click', () => {
        header.classList.toggle('show-nav');
    })
    links.forEach(link =>
        link.addEventListener('click', () => {
            header.classList.remove('show-nav');
        })
    );
}
menuMobile();

// const loading = () => {

//     const loader = document.getElementById('loader')

//     window.addEventListener('load', () => {
//         loader.classList.remove('is-loading')
//     })
// }
// loading();

// if (window.history.replaceState) {
//     window.history.replaceState(null, null, window.location.pathname.slice(0, -5));
// }
function menuMobile() {
    const btn = document.querySelector('.burger');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.navbar a');
    let logo = document.querySelector('.logo a');
    let logoState;


    btn.addEventListener('click', () => {
        header.classList.toggle('show-nav');
        if (logo.classList == 'logo--is-translated') {
            logo.classList.remove('logo--is-translated');
            logoState = "changed";
            return
        }
        if (logoState === "changed") {
            logo.classList.add('logo--is-translated');
        }
    })
    links.forEach(link =>
        link.addEventListener('click', () => {
            header.classList.remove('show-nav');
        })
    );
}
menuMobile();


// if (window.history.replaceState) {
//     window.history.replaceState(null, null, window.location.pathname.slice(0, -5));
// }
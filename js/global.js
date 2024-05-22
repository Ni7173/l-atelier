function menuMobile() {
    const btn = document.querySelector('.burger');
    const header = document.querySelector('header');
    const links = document.querySelectorAll('.navbar a');
    let logo = document.querySelector('.logo a');
    let logoState;

    const disableScrolling = () => {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    const enableScrolling = () => {
        window.onscroll = function () { };
    }

    const scrollManager = () => {
        if (header.classList == "show-nav") {
            disableScrolling();
        } else {
            enableScrolling();
        }
    }


    btn.addEventListener('click', () => {
        header.classList.toggle('show-nav');

        scrollManager();

        if (logo.classList == 'logo--is-translated') {
            logo.classList.remove('logo--is-translated');
            logoState = "changed";
            return
        }
        if (logoState === "changed") {
            logo.classList.add('logo--is-translated');
            logoState = 0;
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
document.addEventListener('DOMContentLoaded', () => {
    function menuMobile() {
        const menuItems = document.querySelectorAll('.menu-list li')
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
            if (header.classList.contains("show-nav")) {
                disableScrolling();
            } else {
                enableScrolling();
            }
        }

        const menuEffect = () => {
            menuItems.forEach(item => {
                item.classList.add('--translated');
                item.style.transition = ""
            })
        }

        const clearMenuItemsClasses = () => {
            menuItems.forEach(item => {
                item.style.transition = "all 0s"
                item.classList.remove('--translated');
            })
        }


        const menuToggle = () => {
            btn.addEventListener('click', () => {
                header.classList.toggle('show-nav');
                logo.style.animation = "var(--header-transition)";

                if (header.classList.contains('show-nav')) {
                    setTimeout(() => {
                        menuEffect();
                    }, 300);
                } else {
                    clearMenuItemsClasses();
                }

                scrollManager();

                if (logo.classList.contains('logo--is-translated')) {
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
                    clearMenuItemsClasses();
                })
            );
        }
        menuToggle();
    }
    menuMobile();
});

// fonctions spécifiques pour toutes pages


const transitionSetting = (elements, transition) => {
    elements.forEach(element => {
        element.style.transition = transition;
    })
}

const itemsAppearing = (items) => {
    items.forEach(item => {
        item.style.transform = "translateY(100%)";
        item.style.opacity = "0";

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.transform = "translateY(0%)";
                        item.style.opacity = "1";
                    }, 100);
                } else {
                    item.style.transform = "translateY(100%)";
                    item.style.opacity = "0";
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        intersectionObserver.observe(item.parentElement);
    })
}


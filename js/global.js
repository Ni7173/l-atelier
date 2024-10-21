document.addEventListener('DOMContentLoaded', () => {
    function menuMobile() {
        const menuItems = document.querySelectorAll('.menu-list li')
        const btn = document.querySelector('.burger');
        const header = document.querySelector('header');
        const allLinks = document.querySelectorAll('.navbar a');
        const links = Array.from(allLinks).filter(link => !link.classList.contains('lang__link'))
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
                    scrollManager();
                })
            );
        }
        menuToggle();
    }
    menuMobile();
});

// test page transition
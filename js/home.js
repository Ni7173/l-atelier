document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    setVideo();
})


const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.right__home__text #switching-text');
    const texts = ["accueillant", "de création", "chaleureux", "d'échange", "de conception", "bienveillant", " d'écoute "];



    let newIndex = 0;

    const changeText = () => {


        setTimeout(() => {
            switchingTxt.innerText = texts[newIndex];
            switchingTxt.style.opacity = 1;
            switchingTxt.style.width = "100%";
            switchingTxt.style.transition = "width 2.5s ease";
        }, 800);

        setTimeout(() => {
            if (newIndex > texts.length - 2) newIndex = 0;
            else newIndex++;
        }, 2500);

        switchingTxt.style.opacity = 0;
        switchingTxt.style.transition = "opacity 0.2s ease-in-out";

        setTimeout(() => {
            switchingTxt.style.width = "0%"
        }, 200);

    }

    setInterval(changeText, 4000);
}

switchingTxtOperator();


document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.home__menu__item');

    menuItems.forEach(item => {
        const link = item.querySelector('.menu__link');
        const hovered = item.querySelector('.menu__hovered');

        let isHovered = false;

        item.addEventListener('click', (e) => {
            hovered.style.opacity = '1';
            window.location.href = link.href;
        });

        item.addEventListener('touchend', () => {
            isHovered = false;
            hovered.style.opacity = '0';
            hovered.style.pointerEvents = 'none';
        });
    });
});


const adjustHomeLogo = () => {
    const logo = document.querySelector('.logo a');
    const trigger = document.querySelector('.trigger');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logo.classList.remove('logo--is-translated');
            } else {
                logo.classList.add('logo--is-translated');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(trigger);
}

adjustHomeLogo();

// const setStarAnimation = () => {
//     const star = document.querySelector('.logo__star');
//     star.style.animation = "turningStar 2.5s infinite";
// }

const setVideo = () => {
    const video = document.querySelector('.hero__video');
    if (video) {
        // video.muted = true;
        // video.loop = true;
        // video.autoplay = true;
        video.play();
        // video.setAttribute('autoplay', 'true');
        // video.setAttribute('loop', 'true');
        // video.setAttribute('muted', 'true');
    }
}

// const textsAnimation = () => {

//     document.addEventListener('DOMContentLoaded', () => {
//         const texts = document.querySelectorAll('.home__text__container p')
//         console.log(texts)
//         itemsAppearing(texts);
//     })
// }
// textsAnimation();

const textsAnimation = () => {
    const texts = document.querySelectorAll('.home__text__container p')

    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            texts.forEach(text => {
                text.style.transform = "translateY(0px)";
                text.style.opacity = "1";
            })
        }, 100);
    })
}
textsAnimation();

const setHomeText = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const textToChange = document.querySelector('.home__text__container .home__text');

        if (window.innerWidth < 550) {
            textToChange.innerText = "Déf. Atelier : n.m."
        }
    })
}
setHomeText();

const menuEffect = () => {
    const menuLinks = document.querySelectorAll('.menu__link');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const menuItem = link.closest('.home__menu__item');
            const menuHovered = menuItem.querySelector('.menu__hovered');
            const menuImg = menuItem.querySelector('.menu__img');
            menuHovered.style.opacity = 1;
            menuImg.style.opacity = 0;
        })
    })
}
menuEffect();
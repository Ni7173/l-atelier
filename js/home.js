document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    setVideo();
    adjustLogoPosition();
})


const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.right__home__text #switching-text');
    const texts = ["de conception", "accueillant", "chaleureux", "d'échange", "bienveillant", " d'écoute ", "de création"];



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

const setVideo = () => {
    const video = document.querySelector('.hero__video');
    if (video) {
        video.play();
    }
}

const textsAnimation = () => {
    const texts = document.querySelectorAll('.home__text__container p')

    document.addEventListener('DOMContentLoaded', () => {
        // setTimeout(() => {
        texts.forEach(text => {
            text.style.transform = "translateY(0px)";
            text.style.opacity = "1";
        })
        // }, 100);
    })
}
textsAnimation();

const setHomeText = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const textToChange = document.querySelector('.home__text__container .home__text');

        const textSetter = () => {
            if (window.innerWidth < 550) {
                textToChange.innerText = "Déf. Atelier : n.m."
            } else {
                textToChange.innerText = "Déf. Atelier :"
            }
        }
        textSetter();
        window.addEventListener('resize', textSetter);

    })
}
setHomeText();

const setRightMobileImg = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 1350) {
            const modalImgToChange2 = document.querySelector('.home__menu .home__menu__item:nth-child(2) .menu__img')
            modalImgToChange2.setAttribute('src', 'img/home/mobile/ACCUEIL-GRAPHISME.jpg')
            const modalImgToChange3 = document.querySelector('.home__menu .home__menu__item:nth-child(3) .menu__img')
            modalImgToChange3.setAttribute('src', 'img/home/mobile/VIGNERONS-ACCUEIL2.jpg')
            const modalImgToChange4 = document.querySelector('.home__menu .home__menu__item:nth-child(4) .menu__img')
            modalImgToChange4.setAttribute('src', 'img/home/mobile/A-PROPOS-2.jpg')
        }
    })
}
setRightMobileImg();

const setLogoColor = () => {
    const logo = document.querySelector('.logo__svg');
    const menuSection = document.getElementById('home__menu');
    window.addEventListener('scroll', () => {
        const menuSectionTop = menuSection.getBoundingClientRect().top;
        const logoBottom = logo.getBoundingClientRect().bottom;

        if (logoBottom >= menuSectionTop) {
            logo.style.color = 'white';
            logo.style.fill = 'white';
        } else {
            logo.style.color = 'black';
            logo.style.fill = 'black';
        }
    })
}
setLogoColor();

const adjustLogoPosition = () => {
    const logo = document.querySelector('.logo a');
    const limit = document.querySelector('.video__mask__lunet');

    const getRemInPixels = () => {
        return parseFloat(getComputedStyle(document.documentElement).fontSize);
    };

    const checkAndAdjustPosition = () => {
        const remInPixels = getRemInPixels();
        const logoRect = logo.getBoundingClientRect();
        const limitRect = limit.getBoundingClientRect();
        const logoBottom = logoRect.bottom;
        const topLimit = limitRect.top;

        const currentTransform = getComputedStyle(logo).transform;
        const currentTranslateY = currentTransform !== 'none' ? parseFloat(currentTransform.split(',')[5]) / remInPixels : 0;

        if (logoBottom > topLimit) {
            const newTranslateY = currentTranslateY + (topLimit - logoBottom) / remInPixels - 1;
            logo.style.setProperty('--ytranslation', `${newTranslateY}rem`);
        } else {
            return
        }
    };

    checkAndAdjustPosition();

    window.addEventListener('resize', checkAndAdjustPosition);
};

const adjustTxtPosition = () => {
    const text = document.querySelector('.home__text__container');
    const limit = document.querySelector('.video__mask__lunet');

    const checkAndAdjustPosition = () => {
        const windowHeight = window.innerHeight;
        const textRect = text.getBoundingClientRect();
        const limitRect = limit.getBoundingClientRect();
        const txtTop = textRect.top;
        const bottomLimit = limitRect.bottom;

        if (txtTop < bottomLimit) {
            const newTop = (((bottomLimit + 1) / windowHeight) * 100) + 3;
            text.style.setProperty('--top-distance', `${newTop}%`);
        }
    };

    checkAndAdjustPosition();

    window.addEventListener('resize', checkAndAdjustPosition);
};

adjustTxtPosition();

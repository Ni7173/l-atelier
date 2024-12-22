const graphismeSlider = () => {
    const imagesLinks = document.querySelectorAll('.project__link');
    const sliderModal = document.getElementById('slider__modal');
    const overlay = document.querySelector('.modal__overlay')
    const closeBtn = document.querySelector('.modal__btn__close')
    const images = document.querySelectorAll('.slider__img_container');
    const switchBtns = document.querySelectorAll('[data-slider-button]');

    const indicatorsContainer = document.querySelector('.indicators');
    let newIndex;

    const createIndicators = (elements, container) => {

        for (let i = 0; i < elements.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.dotNumber = i;
            container.appendChild(dot);
        }
    }
    createIndicators(images, indicatorsContainer);

    const dots = document.querySelectorAll('.dot');


    const resetActiveDot = () => {
        let activeDot = indicatorsContainer.querySelector('.active');
        activeDot.classList.remove('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            transitionSetting(images, "var(--long-transition)");
            newIndex = parseInt(dot.dataset.dotNumber, 10);
            resetActiveDot();
            let activeSlide = document.querySelector('[data-active]');
            if (activeSlide) delete activeSlide.dataset.active;
            dots[newIndex].classList.add('active');
            images[newIndex].dataset.active = true;
        });
    });

    imagesLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            disableScrolling();
            document.body.style.pointerEvents = "unset";
            overlay.classList.add('active');
            sliderModal.classList.add('active');
            images.forEach(img => {
                let imgNumber = img.dataset.slideNumber;
                let linkNumber = link.dataset.linkNumber;
                if (imgNumber === linkNumber) {
                    img.dataset.active = true;
                    newIndex = imgNumber;
                    dots[newIndex].classList.add('active');
                }
            })
        })
    })

    switchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            transitionSetting(images, "var(--long-transition)");

            if (btn.dataset.sliderButton === "prev") {
                let activeSlide = document.querySelector('[data-active]');
                if (activeSlide) delete activeSlide.dataset.active;
                newIndex = newIndex - 1;
                if (newIndex < 0) newIndex = images.length - 1;
                images[newIndex].dataset.active = true;
                resetActiveDot();
                dots[newIndex].classList.add('active');
            }
            else if (btn.dataset.sliderButton === "next") {
                let activeSlide = document.querySelector('[data-active]');
                if (activeSlide) delete activeSlide.dataset.active;
                newIndex++;
                if (newIndex >= images.length) newIndex = 0;
                images[newIndex].dataset.active = true;
                resetActiveDot();
                dots[newIndex].classList.add('active');
            }
        })
    })

    const disableScrolling = () => {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    const enableScrolling = () => {
        window.onscroll = function () { };
    }

    const sliderClosing = () => {

        overlay.addEventListener('click', () => {
            closeSlider();
        })

        closeBtn.addEventListener('click', () => {
            closeSlider();
        })

        const closeSlider = () => {
            transitionSetting(images, "var(--quick-transition)");
            let activeSlide = document.querySelector('[data-active]');
            overlay.classList.remove('active');
            sliderModal.classList.remove('active');
            if (activeSlide) delete activeSlide.dataset.active;
            enableScrolling();
            resetActiveDot();
            document.body.style.pointerEvents = "auto";
        }
    }
    sliderClosing();


    const mobileSwipe = () => {
        const imgList = document.querySelector('.slider__img__list');
        document.addEventListener('DOMContentLoaded', function () {
            let startX = 0;
            let endX = 0;

            imgList.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            imgList.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
            });

            imgList.addEventListener('touchend', () => {
                let activeSlide = document.querySelector('[data-active]');
                if (startX > endX + 50) {
                    if (activeSlide) delete activeSlide.dataset.active;
                    newIndex++;
                    if (newIndex >= images.length) newIndex = 0;
                    if (newIndex < 0) newIndex = images.length - 1;
                    images[newIndex].dataset.active = true;
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                } else if (startX < endX - 50) {
                    if (activeSlide) delete activeSlide.dataset.active;
                    newIndex = newIndex - 1;
                    if (newIndex >= images.length) newIndex = 0;
                    if (newIndex < 0) newIndex = images.length - 1;
                    images[newIndex].dataset.active = true;
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                }
            });
        });
    }
    mobileSwipe();
}
graphismeSlider();

const setMobileSliderImg = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 1000) {
            const squareImages = document.querySelectorAll('.square_img');
            const sliderImages = document.querySelectorAll('.slider__img');

            for (let i = 0; i < squareImages.length; i++) {
                sliderImages.forEach(img => {
                    if (img.classList.contains("vehicle")) {
                        img.parentElement.style.paddingBlock = "7rem"
                        i++;
                    } else {
                        img.setAttribute('src', squareImages[i].src);
                        i++;
                    }
                })
            }
        }
    })
}
setMobileSliderImg();
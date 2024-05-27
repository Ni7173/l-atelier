const graphismeSlider = () => {
    const imagesLinks = document.querySelectorAll('.project__link');
    const sliderModal = document.getElementById('slider__modal');
    const overlay = document.querySelector('.modal__overlay')
    const closeBtn = document.querySelector('.modal__btn__close')
    const images = document.querySelectorAll('.slider__img_container');
    const switchBtns = document.querySelectorAll('[data-slider-button]');

    let newIndex;

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
                if (newIndex >= images.length) newIndex = 0;
                if (newIndex < 0) newIndex = images.length - 1;
                images[newIndex].dataset.active = true;
            }
            else if (btn.dataset.sliderButton === "next") {
                let activeSlide = document.querySelector('[data-active]');
                if (activeSlide) delete activeSlide.dataset.active;
                newIndex++;
                if (newIndex >= images.length) newIndex = 0;
                if (newIndex < 0) newIndex = images.length - 1;
                images[newIndex].dataset.active = true;
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

    const transitionSetting = (elements, transition) => {
        elements.forEach(elem =>
            elem.style.transition = transition
        )
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
            document.body.style.pointerEvents = "auto";
        }
    }
    sliderClosing();


    const setMobileSliderImg = () => {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.innerWidth <= 550) {
                const squareImages = document.querySelectorAll('.img__container > img');
                const sliderImages = document.querySelectorAll('.slider__img');

                for (let i = 0; i < squareImages.length; i++) {
                    sliderImages.forEach(img => {
                        img.setAttribute('src', squareImages[i].src);
                    })
                }
            }

            else return
        })
    }
    setMobileSliderImg();


    const mobileSwipe = () => {
        document.addEventListener('DOMContentLoaded', function () {
            // if (sliderModal.classList == "active") {
            let startX = 0;
            let endX = 0;

            sliderModal.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            sliderModal.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
            });

            sliderModal.addEventListener('touchend', () => {
                let activeSlide = document.querySelector('[data-active]');
                if (startX > endX + 50) {
                    if (activeSlide) delete activeSlide.dataset.active;
                    newIndex = newIndex++;
                    if (newIndex >= images.length) newIndex = 0;
                    if (newIndex < 0) newIndex = images.length - 1;
                    images[newIndex].dataset.active = true;
                } else if (startX < endX - 50) {
                    if (activeSlide) delete activeSlide.dataset.active;
                    newIndex = newIndex - 1;
                    if (newIndex >= images.length) newIndex = 0;
                    if (newIndex < 0) newIndex = images.length - 1;
                    images[newIndex].dataset.active = true;
                } else if (endX === 0) {
                    return
                }
            });
            // }
        });
    }
    mobileSwipe();
}
graphismeSlider();
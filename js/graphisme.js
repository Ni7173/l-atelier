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


    const sliderClosing = () => {

        overlay.addEventListener('click', () => {
            closeSlider();
        })

        closeBtn.addEventListener('click', () => {
            closeSlider();
        })

        const closeSlider = () => {
            let activeSlide = document.querySelector('[data-active]');
            overlay.classList.remove('active');
            sliderModal.classList.remove('active');
            if (activeSlide) delete activeSlide.dataset.active;
        }
    }
    sliderClosing();
}
graphismeSlider();
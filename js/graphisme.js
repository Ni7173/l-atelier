const setMobileSliderImg = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 550) {
            const squareImages = document.querySelectorAll('.img__container > img');
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
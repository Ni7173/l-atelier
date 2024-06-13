const reviewSlider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelector('.reviews__list');
        const dots = document.querySelectorAll('.dot');
        const switchBtns = document.querySelectorAll('[data-slider-button]');
        let newIndex = 0;

        const calculatePosition = (newIndex) => {
            return `${315 - 90 * newIndex}%`;
        };

        const setReview = (position) => {
            console.log(newIndex);
            dots.forEach(dot => dot.classList.remove('active'));
            dots[newIndex].classList.add('active');
            slides.style.transform = `translateX(${position})`;
        };

        setReview(calculatePosition(newIndex));

        switchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                newIndex = (newIndex + (btn.dataset.sliderButton === "prev" ? -1 : 1) + dots.length) % dots.length;
                setReview(calculatePosition(newIndex));
            });
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                newIndex = parseInt(dot.dataset.dotNumber, 10);
                setReview(calculatePosition(newIndex));
            });
        });

        const mobileSwipe = () => {
            let startX = 0;
            let endX = 0;


            slides.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
                console.log('touchstart', startX);
            });

            slides.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
                console.log('touchmove', endX);
            });

            slides.addEventListener('touchend', () => {
                if (startX > endX + 50) {
                    newIndex++;
                    if (newIndex >= dots.length) newIndex = 0;
                    if (newIndex < 0) newIndex = dots.length - 1;
                    setReview(calculatePosition(newIndex));
                } else if (startX < endX - 50) {
                    newIndex = newIndex - 1;
                    if (newIndex >= dots.length) newIndex = 0;
                    if (newIndex < 0) newIndex = dots.length - 1;
                    setReview(calculatePosition(newIndex));
                }
            });
        };
        mobileSwipe();
    });
};

reviewSlider();
const reviewSlider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelector('.reviews__list');
        const reviewsContainer = document.querySelector('.reviews__section__container');
        const dots = document.querySelectorAll('.dot');
        const switchBtns = document.querySelectorAll('[data-slider-button]');
        let newIndex = 0;
        let intervalId;

        const calculatePosition = newIndex => `${90 * (2 - newIndex)}%`;

        const transitionSetting = (element, transition) => {
            element.style.transition = transition;
        }

        const setReview = position => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[newIndex].classList.add('active');
            slides.style.transform = `translateX(${position})`;
        }
        setReview();

        const resetInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(switchReviewAutomatically, 8000);
        }

        const switchReviewAutomatically = () => {
            transitionSetting(slides, "var(--long-transition)");
            newIndex = (newIndex + 1) % dots.length;
            setReview(calculatePosition(newIndex));
        };

        switchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                transitionSetting(slides, "var(--smooth-transition)");
                newIndex = (newIndex + (btn.dataset.sliderButton === "prev" ? -1 : 1) + dots.length) % dots.length;
                setReview(calculatePosition(newIndex));
                resetInterval();
            });
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                newIndex = parseInt(dot.dataset.dotNumber, 10);
                setReview(calculatePosition(newIndex));
                resetInterval();
            });
        });

        const mobileSwipe = () => {
            let startX = 0;
            let endX = 0;

            reviewsContainer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            reviewsContainer.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
            });

            reviewsContainer.addEventListener('touchend', () => {
                if (startX > endX + 50) {
                    newIndex++;
                    if (newIndex >= dots.length) newIndex = 0;
                    setReview(calculatePosition(newIndex));
                    resetInterval();
                } else if (startX < endX - 50) {
                    newIndex = newIndex - 1;
                    if (newIndex < 0) newIndex = dots.length - 1;
                    setReview(calculatePosition(newIndex));
                    resetInterval();
                }
            });
        }
        mobileSwipe();

        intervalId = setInterval(switchReviewAutomatically, 6000);
    });
}

reviewSlider();

const reviewSlider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelector('.reviews__list');
        const reviewsContainer = document.querySelector('.reviews__container')
        const switchBtns = document.querySelectorAll('[data-slider-button]');
        const dotsContainer = document.querySelector('.indicator');
        const reviews = document.querySelectorAll('.review');
        let newIndex = 0;
        let dotIndex = 0;

        const calculatePosition = (newIndex) => {
            // commencer par le début (inspect) puis enlever 90
            const initialPosition = ((reviews.length * 90) / 2) - 45;
            return `${initialPosition - 90 * newIndex}%`;
        };

        const createDots = () => {
            reviews.forEach(review => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.dataset.dotNumber = dotIndex;
                dotIndex++;
                dotsContainer.appendChild(dot);
                if (dot.dataset.dotNumber === newIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    newIndex = parseInt(dot.dataset.dotNumber, 10);
                    setReview(calculatePosition(newIndex));
                });
            })
        }
        createDots();

        const dots = document.querySelectorAll('.dot');


        const setReview = (position) => {
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
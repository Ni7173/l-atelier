// const reviewSlider = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         const slides = document.querySelector('.reviews__list');
//         const reviewsContainer = document.querySelector('.reviews__section__container');
//         const dots = document.querySelectorAll('.dot');
//         const switchBtns = document.querySelectorAll('[data-slider-button]');
//         let newIndex = 0;
//         let position = "-270%";

//         const calculatePosition = newIndex => `${90 * (2 - newIndex)}%`;

//         const setReview = (position) => {
//             dots.forEach(dot => dot.classList.remove('active'));
//             dots[newIndex].classList.add('active');
//             slides.style.transform = `translateX(${position})`;
//         }
//         setReview(position);

//         switchBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 newIndex = (newIndex + (btn.dataset.sliderButton === "prev" ? -1 : 1) + dots.length) % dots.length;
//                 setReview(calculatePosition(newIndex));
//             });
//         });

//         dots.forEach(dot => {
//             dot.addEventListener('click', () => {
//                 newIndex = parseInt(dot.dataset.dotNumber, 10);
//                 setReview(calculatePosition(newIndex));
//             });
//         });

//         const mobileSwipe = () => {
//             let startX = 0;
//             let endX = 0;

//             reviewsContainer.addEventListener('touchstart', (event) => {
//                 startX = event.touches[0].clientX;
//             });

//             reviewsContainer.addEventListener('touchmove', (event) => {
//                 endX = event.touches[0].clientX;
//             });

//             reviewsContainer.addEventListener('touchend', () => {
//                 if (startX > endX + 50) {
//                     newIndex++;
//                     if (newIndex >= dots.length) newIndex = 0;
//                     setReview(calculatePosition(newIndex));
//                 } else if (startX < endX - 50) {
//                     newIndex = newIndex - 1;
//                     if (newIndex < 0) newIndex = dots.length - 1;
//                     setReview(calculatePosition(newIndex));
//                 }
//             });
//         }
//         mobileSwipe();
//     });
// }

// reviewSlider();


const reviewSlider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelector('.reviews__list');
        const reviewsContainer = document.querySelector('.reviews__section__container');
        const dots = document.querySelectorAll('.dot');
        const switchBtns = document.querySelectorAll('[data-slider-button]');
        let newIndex = 0; // Start from the first index

        // Calculate position starting from +270%
        const calculatePosition = (newIndex) => {
            return `${270 - 90 * newIndex}%`;
        };

        const setReview = (position) => {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[newIndex].classList.add('active');
            slides.style.transform = `translateX(${position})`;
        };

        // Initially set the first review to the first slide
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

            reviewsContainer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            reviewsContainer.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
            });

            reviewsContainer.addEventListener('touchend', () => {
                if (startX > endX + 50) {
                    newIndex = (newIndex + 1) % dots.length;
                    setReview(calculatePosition(newIndex));
                } else if (startX < endX - 50) {
                    newIndex = (newIndex - 1 + dots.length) % dots.length;
                    setReview(calculatePosition(newIndex));
                }
            });
        };
        mobileSwipe();
    });
};

reviewSlider();





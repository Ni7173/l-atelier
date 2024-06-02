// const reviewSlider = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         const slides = document.querySelector('.reviews__list');
//         const reviewsContainer = document.querySelector('.reviews__section__container');
//         const dots = document.querySelectorAll('.dot');
//         const switchBtns = document.querySelectorAll('[data-slider-button]');
//         let newIndex = 0;
//         let intervalId;


//         // const calculatePosition = (newIndex) => {
//         //     return `${90 * (2 - newIndex)}%`;
//         // };
//         const calculatePosition = newIndex => `${90 * (2 - newIndex)}%`;


//         const transitionSetting = (element, transition) => {
//             element.style.transition = transition
//         }

//         const setReview = (position) => {
//             dots.forEach(dot => {
//                 dot.classList.remove('active');
//             })
//             dots[newIndex].classList.add('active');
//             slides.style.transform = `translateX(${position})`;
//         }
//         setReview();

//         const reviewsSwitch = () => {
//             switchBtns.forEach(btn => {
//                 btn.addEventListener('click', () => {
//                     if (slides.style.transition != "var(--smooth-transition)")
//                         transitionSetting(slides, "var(--smooth-transition)")
//                     if (btn.dataset.sliderButton === "prev") {
//                         newIndex = newIndex - 1;
//                         if (newIndex < 0) newIndex = dots.length - 1;
//                         let position = calculatePosition(newIndex);
//                         setReview(position)
//                     } else {
//                         newIndex++;
//                         if (newIndex >= dots.length) newIndex = 0;
//                         let position = calculatePosition(newIndex);
//                         setReview(position);
//                     }
//                     clearInterval(intervalId);
//                     intervalId = setInterval(switchReviewAutomatically, 8000);
//                 })
//             })
//         }
//         reviewsSwitch();


//         const switchReviewAutomatically = () => {

//             if (slides.style.transition != "var(--long-transition)") {
//                 transitionSetting(slides, "var(--long-transition)");
//             }
//             newIndex++;
//             if (newIndex >= dots.length) newIndex = 0;

//             let position = calculatePosition(newIndex);
//             setReview(position);
//         };

//         intervalId = setInterval(switchReviewAutomatically, 8000);



//         const dotsLink = () => {
//             dots.forEach(dot => {
//                 dot.addEventListener('click', () => {
//                     if (dot.dataset.dotNumber === newIndex) return
//                     newIndex = dot.dataset.dotNumber;
//                     let position = calculatePosition(newIndex);
//                     setReview(position);
//                     clearInterval(intervalId);
//                     intervalId = setInterval(switchReviewAutomatically, 8000);
//                 })
//             })
//         }
//         dotsLink();

//         const mobileSwipe = () => {
//             let startX = 0;
//             let endX = 0;
//             let isDragging = false;

//             reviewsContainer.addEventListener('touchstart', (event) => {
//                 startX = event.touches[0].clientX;
//                 isDragging = true;
//             });

//             reviewsContainer.addEventListener('touchmove', (event) => {
//                 if (isDragging) {
//                     endX = event.touches[0].clientX;
//                     const deltaX = endX - startX;
//                     slides.style.transform = `translateX(${deltaX}px)`;
//                 }
//             });

//             reviewsContainer.addEventListener('touchend', () => {
//                 isDragging = false;
//                 slides.style.transform = '';

//                 if (startX > endX + 50) {
//                     newIndex++;
//                     if (newIndex >= dots.length) newIndex = 0;
//                 } else if (startX < endX - 50) {
//                     newIndex = newIndex - 1;
//                     if (newIndex < 0) newIndex = dots.length - 1;
//                 }

//                 let position = calculatePosition(newIndex);
//                 setReview(position);
//             });
//         };
//         mobileSwipe();

//     }
//     )
// }

// reviewSlider();

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

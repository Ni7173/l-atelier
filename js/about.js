const reviewSlider = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelector('.reviews__list');
        const reviewsContainer = document.querySelector('.reviews__section__container');
        const dots = document.querySelectorAll('.dot');
        const switchBtns = document.querySelectorAll('[data-slider-button]');
        let newIndex = 0;
        let position = "180%";

        const calculatePosition = (newIndex) => {
            return `${90 * (2 - newIndex)}%`;
        };

        const setReview = (position) => {
            dots.forEach(dot => {
                dot.classList.remove('active');
            })
            dots[newIndex].classList.add('active');
            slides.style.transform = `translateX(${position})`;
        }
        setReview();

        const reviewsSwitch = () => {
            switchBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    if (btn.dataset.sliderButton === "prev") {
                        newIndex = newIndex - 1;
                        if (newIndex < 0) newIndex = dots.length - 1;
                        let position = calculatePosition(newIndex);
                        setReview(position)
                    } else {
                        newIndex++;
                        if (newIndex >= dots.length) newIndex = 0;
                        let position = calculatePosition(newIndex);
                        setReview(position);
                    }
                })
            })
        }
        reviewsSwitch();

        const dotsLink = () => {
            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    if (dot.dataset.dotNumber === newIndex) return
                    newIndex = dot.dataset.dotNumber;
                    let position = calculatePosition(newIndex);
                    setReview(position);
                })
            })
        }
        dotsLink();

        const mobileSwipe = () => {
            let startX = 0;
            let endX = 0;
            let isDragging = false;

            reviewsContainer.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
                isDragging = true;
            });

            reviewsContainer.addEventListener('touchmove', (event) => {
                if (isDragging) {
                    endX = event.touches[0].clientX;
                    const deltaX = endX - startX;
                    slides.style.transform = `translateX(${deltaX}px)`;
                }
            });

            reviewsContainer.addEventListener('touchend', () => {
                isDragging = false;
                slides.style.transform = '';

                if (startX > endX + 50) {
                    newIndex++;
                    if (newIndex >= dots.length) newIndex = 0;
                } else if (startX < endX - 50) {
                    newIndex = newIndex - 1;
                    if (newIndex < 0) newIndex = dots.length - 1;
                }

                let position = calculatePosition(newIndex);
                setReview(position);
            });
        };

        mobileSwipe();
    }
    )
}

reviewSlider();

// marche mais sans transition

// const reviewSlider = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         // const slider = document.querySelector('.slider');
//         // const reviewsContainer = document.querySelector('[data-slides]');
//         const reviewTxt = document.querySelector('.review__text');
//         const reviewAuthor = document.querySelector('.review__author');
//         const dots = document.querySelectorAll('.dot');
//         const switchBtns = document.querySelectorAll('[data-slider-button]');
//         const reviewsContent = [
//             {
//                 "text": "<i>« Anne est une excellente graphiste avec qui nous avons travaillé pour des créations d'étiquettes de vin sur plusieurs de nos gammes.Sa capacité à écouter attentivement nos besoins et nos idées se reflète dans chaque projet, les échanges sont faciles, toujours très constructifs et éclairés par son expérience. Grâce à son sens aigu du détail et à sa créativité, Anne parvient à capturer l'essence unique de chaque vin en créant des étiquettes élégantes et uniques qui séduisent les consommateurs. »</i> ",
//                 "author": "Michel Gallière - Cave de Clairmont (26)"
//             },
//             {
//                 "text": "<i>« Anne nous a suivi plusieurs années, elle a toujours perçue ce que nous souhaitions, et est fort de propositions ! Son point fort ... la créativité ! »</i>",
//                 "author": "Delphine Amira - Vignoble Amira"
//             },
//             {
//                 "text": "<i>« Disponible, efficace et a l'écoute de nos attentes, c'est un plaisir de travailler avec Anne sur tout types de projets graphique »</i>",
//                 "author": "Martial, la ferme des Arnaud"
//             },
//             {
//                 "text": "<i>« J'ai confié mes projets de création d'étiquettes à Anne avec qui le \"courant\" est très bien passé. Professionnelle et visionnaire, Anne a su s'imprégner de l'histoire de mes vins et me proposer des versions, originales et modernes alliant technicité de la matière, des couleurs et des formes. Les retouches ou changements imprévus se font dans la continuité et réactivité! Cest vraiment un plaisir de travailler avec cette charmante personne ! Je recommande! »</i>",
//                 "author": "Jérôme VINCENT - Domaine de Magord"
//             },
//             {
//                 "text": "<i>« Le dynamisme, sa rapidité et son écoute en font un atout exceptionnel pour le domaine ! Nous travaillons ensemble depuis de nombreuses années, et nous avons hâte de continuer nos futurs projets avec Anne ! »</i>",
//                 "author": "David Combier - Domaine Combier"
//             }
//         ]
//         let newIndex = 0;

//         const setReview = () => {
//             reviewTxt.style.transition = "all .5s ease-out";
//             reviewAuthor.style.transition = "all .5s ease-out";
//             reviewTxt.style.opacity = "0";
//             reviewAuthor.style.opacity = "0";
//             reviewTxt.innerHTML = reviewsContent[newIndex].text;
//             reviewAuthor.innerText = reviewsContent[newIndex].author;
//             reviewTxt.style.opacity = "1";
//             reviewAuthor.style.opacity = "1";
//             dots.forEach(dot => {
//                 dot.classList.remove('active');
//             })
//             dots[newIndex].classList.add('active');
//         }
//         setReview();

//         const reviewsSwitch = () => {
//             switchBtns.forEach(btn => {
//                 btn.addEventListener('click', () => {
//                     if (btn.dataset.sliderButton === "prev") {
//                         newIndex = newIndex - 1;
//                         if (newIndex < 0) newIndex = reviewsContent.length - 1;
//                         setReview()
//                     } else {
//                         newIndex++;
//                         if (newIndex >= reviewsContent.length) newIndex = 0;
//                         setReview();
//                     }
//                     console.log(newIndex)
//                 })
//             })
//         }
//         reviewsSwitch();

//         dots.forEach(dot => {
//             dot.addEventListener('click', () => {
//                 if (dot.dataset.dotNumber === newIndex) return
//                 newIndex = dot.dataset.dotNumber;
//                 setReview();
//             })
//         })
//     }
//     )
// }

// reviewSlider();
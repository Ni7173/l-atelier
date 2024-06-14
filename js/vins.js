const sliderImg = () => {
    let clickZone = document.querySelector('.lateral_content');
    let intervalId;

    clickZone.addEventListener("click", () => {
        let transitionDuration = 1;
        const slidesTransition = document.querySelectorAll('.slide');
        const slides = document.querySelector("[data-slides]");
        const slideChildren = [...slides.children].filter(child => !child.matches('button'));
        const activeSlide = document.querySelector("[data-active]");
        transitionSetting(slidesTransition, `${transitionDuration}s`)

        let newIndex = slideChildren.indexOf(activeSlide) + 1;
        if (newIndex >= slideChildren.length) newIndex = 0;

        delete activeSlide.dataset.active;
        slideChildren[newIndex].dataset.active = true;

        clearInterval(intervalId);
        intervalId = setInterval(switchSlideAutomatically, 4500);
    });

    const switchSlideAutomatically = () => {
        let transitionDuration = 2.5;
        const slidesTransition = document.querySelectorAll('.slide');


        const offset = 1;
        const slides = document.querySelector('[data-slides]');
        const activeSlide = document.querySelector("[data-active]");
        const slideChildren = [...slides.children].filter(child => !child.matches('button'));

        transitionSetting(slidesTransition, `${transitionDuration}s`);
        let newIndex = slideChildren.indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slideChildren.length - 1;
        if (newIndex >= slideChildren.length) newIndex = 0;

        slideChildren[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    };

    document.addEventListener('DOMContentLoaded', () => {
        intervalId = setInterval(switchSlideAutomatically, 4500);
    });
}
sliderImg();


// modals

// const vinSlider = () => {
//     const sliderModal = document.querySelector('.modals__container');
//     const overlay = document.querySelector('.modal__overlay')
//     const closeBtn = document.querySelector('.modal__btn__close')
//     const modals = document.querySelectorAll('[data-modals-id]');
//     const modalsTransition = document.querySelectorAll('.modal_content')
//     const projectLinks = document.querySelectorAll('[data-project-link]');
//     const switchBtns = document.querySelectorAll('.modal-button');

//     let activeModal;
//     let newIndex = 0;

//     projectLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             e.preventDefault();
//             disableScrolling();
//             document.body.style.pointerEvents = "unset";
//             overlay.classList.add('active');
//             sliderModal.classList.add('active');
//             modals.forEach(img => {
//                 let imgNumber = img.dataset.slideNumber;
//                 let linkNumber = link.dataset.linkNumber;
//                 if (imgNumber === linkNumber) {
//                     img.dataset.active = true;
//                     newIndex = imgNumber;
//                 }
//             })
//         })
//     })

//     switchBtns.forEach(btn => {
//         btn.addEventListener('click', () => {
//             transitionSetting(modalsTransition, "var(--long-transition)");

//             if (btn.dataset.sliderButton === "prev") {
//                 let activeModal = document.querySelector('[data-active]');
//                 if (activeModal) delete activeModal.dataset.active;
//                 newIndex = newIndex - 1;
//                 // if (newIndex >= modals.length) newIndex = 0;
//                 if (newIndex < 0) newIndex = modals.length - 1;
//                 modals[newIndex].dataset.active = true;
//             }
//             else if (btn.dataset.sliderButton === "next") {
//                 let activeModal = document.querySelector('[data-active]');
//                 if (activeModal) delete activeModal.dataset.active;
//                 newIndex++;
//                 if (newIndex >= modals.length) newIndex = 0;
//                 // if (newIndex < 0) newIndex = modals.length - 1;
//                 modals[newIndex].dataset.active = true;
//             }
//         })
//     })

//     const disableScrolling = () => {
//         var x = window.scrollX;
//         var y = window.scrollY;
//         window.onscroll = function () { window.scrollTo(x, y); };
//     }

//     const enableScrolling = () => {
//         window.onscroll = function () { };
//     }

//     if (window.innerWidth > 900) {
//         const showSwitchBtns = () => {
//             let isOverModal = false;
//             let isOverSwitchBtn = false;

//             const updateSwitchBtnsVisibility = () => {
//                 if (isOverModal || isOverSwitchBtn) {
//                     switchBtns.forEach(btn => {
//                         btn.classList.add('active');
//                     });
//                 } else {
//                     switchBtns.forEach(btn => {
//                         btn.classList.remove('active');
//                     });
//                 }
//             };

//             modals.forEach(modal => {
//                 modal.addEventListener('mouseenter', () => {
//                     isOverModal = true;
//                     updateSwitchBtnsVisibility();
//                 });
//                 modal.addEventListener('mouseleave', () => {
//                     isOverModal = false;
//                     updateSwitchBtnsVisibility();
//                 });
//             });

//             switchBtns.forEach(btn => {
//                 btn.addEventListener('mouseenter', () => {
//                     isOverSwitchBtn = true;
//                     updateSwitchBtnsVisibility();
//                 });
//                 btn.addEventListener('mouseleave', () => {
//                     isOverSwitchBtn = false;
//                     updateSwitchBtnsVisibility();
//                 });
//             });
//         }
//         showSwitchBtns();
//     }

//     const sliderClosing = () => {

//         overlay.addEventListener('click', () => {
//             closeSlider();
//         })

//         closeBtn.addEventListener('click', () => {
//             closeSlider();
//         })

//         const closeSlider = () => {
//             transitionSetting(modalsTransition, "var(--quick-transition)");
//             let activeModal = document.querySelector('[data-active]');
//             overlay.classList.remove('active');
//             sliderModal.classList.remove('active');
//             if (activeModal) delete activeModal.dataset.active;
//             enableScrolling();
//             transitionSetting(switchBtns, "unset");
//             switchBtns.forEach(btn => {
//                 btn.classList.remove('active');
//             });
//             document.body.style.pointerEvents = "auto";
//         }
//     }
//     sliderClosing();


//     const mobileSwipe = () => {
//         const imgList = document.querySelector('.slider__img__list');
//         document.addEventListener('DOMContentLoaded', function () {
//             let startX = 0;
//             let endX = 0;

//             imgList.addEventListener('touchstart', (event) => {
//                 startX = event.touches[0].clientX;
//             });

//             imgList.addEventListener('touchmove', (event) => {
//                 endX = event.touches[0].clientX;
//             });

//             imgList.addEventListener('touchend', () => {
//                 activeModal = document.querySelector('[data-active]');
//                 if (startX > endX + 50) {
//                     if (activeModal) delete activeModal.dataset.active;
//                     newIndex++;
//                     if (newIndex >= modals.length) newIndex = 0;
//                     if (newIndex < 0) newIndex = modals.length - 1;
//                     modals[newIndex].dataset.active = true;
//                 } else if (startX < endX - 50) {
//                     if (activeModal) delete activeModal.dataset.active;
//                     newIndex = newIndex - 1;
//                     if (newIndex >= modals.length) newIndex = 0;
//                     if (newIndex < 0) newIndex = modals.length - 1;
//                     modals[newIndex].dataset.active = true;
//                 }
//             });
//         });
//     }
//     mobileSwipe();
// }
// vinSlider();

const modalsManagement = () => {
    const modals = document.querySelectorAll('[data-modals-id]');
    const modalsContainer = document.getElementById('modals');
    const projectLinks = document.querySelectorAll('[data-project-link]');
    const overlay = document.querySelector('.modal__overlay');
    const closeBtn = document.querySelector('.modal__btn__close');
    const switchBtns = document.querySelectorAll('.modal-button');

    let activeModal;
    let newIndex = 0;

    const indicatorsContainer = document.querySelector('.indicators');

    const createIndicators = (elements, container) => {

        for (let i = 0; i < elements.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.dotNumber = i;
            container.appendChild(dot);
        }
    }
    createIndicators(modals, indicatorsContainer);

    const dots = document.querySelectorAll('.dot');


    const resetActiveDot = () => {
        let activeDot = indicatorsContainer.querySelector('.active');
        if (activeDot) activeDot.classList.remove('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            newIndex = parseInt(dot.dataset.dotNumber, 10);
            resetActiveDot();
            transitionSetting(modals, "opacity .6s ease-out, width 0s");
            dots[newIndex].classList.add('active');
            activeModal = document.querySelector('[data-modal-active]');
            if (activeModal) delete activeModal.dataset.modalActive;
            modals[newIndex].dataset.modalActive = true;
            modals[newIndex].style.pointerEvents = "all";
        });
    });

    if (window.innerWidth > 900) {
        const showSwitchBtns = () => {
            let isOverModal = false;
            let isOverSwitchBtn = false;

            const updateSwitchBtnsVisibility = () => {
                if (isOverModal || isOverSwitchBtn) {
                    switchBtns.forEach(btn => {
                        btn.classList.add('active');
                    });
                } else {
                    switchBtns.forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
            };

            modals.forEach(modal => {
                modal.addEventListener('mouseenter', () => {
                    isOverModal = true;
                    updateSwitchBtnsVisibility();
                });
                modal.addEventListener('mouseleave', () => {
                    isOverModal = false;
                    updateSwitchBtnsVisibility();
                });
            });

            switchBtns.forEach(btn => {
                btn.addEventListener('mouseenter', () => {
                    isOverSwitchBtn = true;
                    updateSwitchBtnsVisibility();
                });
                btn.addEventListener('mouseleave', () => {
                    isOverSwitchBtn = false;
                    updateSwitchBtnsVisibility();
                });
            });
        }
        showSwitchBtns();
    }

    const showModal = () => {
        projectLinks.forEach(projectLink => {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                disableScrolling();
                overlay.classList.add('active')
                modalsContainer.classList.add('active')
                transitionSetting(switchBtns, "var(--quick-transition)");
                transitionSetting(modals, "var(--smooth-transition)");
                let projectId = projectLink.dataset.projectLink;
                let linkNumber = projectLink.dataset.linkNumber;
                closeBtn.style.transition = "var(--quick-transition)";
                modals.forEach(modal => {
                    if (modal.dataset.modalsId === projectId) {
                        modal.dataset.modalActive = true;
                        newIndex = linkNumber;
                        setTimeout(() => {
                            modal.style.pointerEvents = "all";
                            closeBtn.classList.add('active');
                            indicatorsContainer.style.opacity = ".6";
                            dots[newIndex].classList.add('active');
                        }, 450);
                    }
                })
            })
        })
    }
    showModal();

    const disableScrolling = () => {
        var x = window.scrollX;
        var y = window.scrollY;
        window.onscroll = function () { window.scrollTo(x, y); };
    }

    const enableScrolling = () => {
        window.onscroll = function () { };
    }

    const closeModal = () => {
        overlay.addEventListener('click', () => {
            closeActiveModal();
        })

        closeBtn.addEventListener('click', () => {
            closeActiveModal();
        });


        const closeActiveModal = () => {
            switchBtns.forEach(btn => {
                btn.classList.remove('active')
            })
            closeBtn.classList.remove('active');
            closeBtn.style.transition = "none";
            overlay.classList.remove('active')
            modalsContainer.classList.remove('active')
            activeModal = document.querySelector('[data-modal-active]');
            if (activeModal) delete activeModal.dataset.modalActive;
            resetModalPointerEvent(modals, "none")
            enableScrolling();
            transitionSetting(modals, "unset")
            transitionSetting(switchBtns, "unset")
            resetActiveDot();
            indicatorsContainer.style.opacity = 0;
        }
    }
    closeModal();

    const resetModalPointerEvent = (elements, transition) => {
        elements.forEach(elem =>
            elem.style.pointerEvents = transition
        )
    }

    const modalSwitch = () => {
        switchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                transitionSetting(modals, "opacity .6s ease-out, width 0s");
                activeModal = document.querySelector('[data-modal-active]');

                if (btn.dataset.modalButton === "prev") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex = newIndex - 1;
                    if (newIndex < 0) newIndex = modals.length - 1;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                } else if (btn.dataset.modalButton === "next") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    if (newIndex >= modals.length) newIndex = 0;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                }
            })
        })
    }
    modalSwitch();

    const mobileSwipe = () => {
        let startX = 0;
        let endX = 0;

        modals.forEach((modal) => {
            modal.addEventListener('touchstart', (event) => {
                startX = event.touches[0].clientX;
            });

            modal.addEventListener('touchmove', (event) => {
                endX = event.touches[0].clientX;
            });

            modal.addEventListener('touchend', () => {
                activeModal = document.querySelector('[data-modal-active]');
                transitionSetting(modals, "opacity .6s ease-out, width 0s");

                // transitionSetting(modals, "opacity .6s ease-out, width 0s")


                if (startX > endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    if (newIndex >= modals.length) newIndex = 0;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                } else if (startX < endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex = newIndex - 1;
                    if (newIndex < 0) newIndex = modals.length - 1;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        mobileSwipe();
    });
}
modalsManagement();

const setRightMobileImg = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 550) {
            // veyrat
            const imgIllustrated = document.querySelector('[data-modals-id="modal-5"] .modal_img img');
            const imgToReplace = document.querySelector('[data-modals-id="modal-5"] .modal_left_content img');
            imgToReplace.setAttribute('src', imgIllustrated.src)
            // bartavelle
            const modalImgToChange1 = document.querySelector('[data-modals-id="modal-3"] .modal_left_content img')
            modalImgToChange1.setAttribute('src', '../img/vins/modales/photos/mobile/BARTAVELLE-RECADRE-MOBILE.webp')
            const modalImgToChange2 = document.querySelector('[data-modals-id="modal-8"] .modal_left_content img')
            modalImgToChange2.setAttribute('src', '../img/vins/modales/photos/mobile/PRIMEUR-MONTFRIN-RECADRE-MOBILE.webp')
            const modalImgToChange3 = document.querySelector('[data-modals-id="modal-12"] .modal_left_content img')
            modalImgToChange3.setAttribute('src', '../img/vins/modales/photos/mobile/BELLE-DES-CLOS-CARRE.webp')
            const modalImgToChange4 = document.querySelector('[data-modals-id="modal-14"] .modal_left_content img')
            modalImgToChange4.setAttribute('src', '../img/vins/modales/photos/mobile/CHATEAU-JAUNE-CARRE.webp')
        }
    })
}
setRightMobileImg();


const setMobileModalsText = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth < 550) {
            const textsToChange = document.querySelectorAll('.modal__long__text');
            texts = ["Le Design a été revisité, plus moderne, épuré, tout en conservant sa forte identité très haute en couleur et sa typographie bien particulière.",
                "La refonte du Design de la cuvée Bois Fardeau, du nom du lieu - dit, est une ode à l’authenticité, alliée à une pureté toute contemporaine.",
                "La mise en avant de la parcelle de veilles vignes dont est issue le raisin de cette cuvée souligne l'implantation typique des vignobles de l'appellation Crozes-Hermitage.",
                "Le Design de cette cuvée du Domaine Combier tient son caractère tempétueux du climat particulièrement rude de l’année de sa première récolte.",
                "Le paysage de cette parcelle de vieilles vignes dessiné à la main nous plonge dans cet univers poétique d'un autre temps."]

            for (let i = 0; i < textsToChange.length; i++) {
                textsToChange[i].innerText = texts[i]
            }
        }
    })
}
setMobileModalsText();
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
                        setTimeout(() => {
                            modal.style.pointerEvents = "all";
                            closeBtn.classList.add('active')
                        }, 450);
                        newIndex = linkNumber;
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
            closeBtn.style.transition = "unset";
            overlay.classList.remove('active')
            modalsContainer.classList.remove('active')
            activeModal = document.querySelector('[data-modal-active]');
            activeModal.style.pointerEvents = "none";
            if (activeModal) delete activeModal.dataset.modalActive;
            enableScrolling();
            transitionSetting(modals, "unset")
            transitionSetting(switchBtns, "unset")
        }
    }
    closeModal();

    const transitionSetting = (elements, transition) => {
        elements.forEach(elem =>
            elem.style.transition = transition
        )
    }

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
                } else if (btn.dataset.modalButton === "next") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    if (newIndex >= modals.length) newIndex = 0;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
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
                // transitionSetting(modals, "opacity .6s ease-out, width 0s")


                if (startX > endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    if (newIndex >= modals.length) newIndex = 0;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                } else if (startX < endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex = newIndex - 1;
                    if (newIndex < 0) newIndex = modals.length - 1;
                    resetModalPointerEvent(modals, "none")
                    modals[newIndex].dataset.modalActive = true;
                    modals[newIndex].style.pointerEvents = "all";
                }
            });
        });
    }
    document.addEventListener('DOMContentLoaded', function () {
        mobileSwipe();
    });
}
modalsManagement();


// modals management by chatgpt

// const modalsManagement = () => {
//     const modals = document.querySelectorAll('[data-modals-id]');
//     const modalsTransition = document.querySelectorAll('.modal_content');
//     const projectLinks = document.querySelectorAll('[data-project-link]');
//     const overlay = document.querySelector('.modal__overlay');
//     const closeBtns = document.querySelectorAll('.modal__btn__close');
//     const switchBtns = document.querySelectorAll('.modal-button');

//     let newIndex = 0;

//     const showSwitchBtns = () => {
//         let isOverModal = false;
//         let isOverSwitchBtn = false;

//         const updateSwitchBtnsVisibility = () => {
//             if (isOverModal || isOverSwitchBtn) {
//                 switchBtns.forEach(btn => btn.classList.add('active'));
//             } else {
//                 switchBtns.forEach(btn => btn.classList.remove('active'));
//             }
//         };

//         modals.forEach(modal => {
//             modal.addEventListener('mouseenter', () => {
//                 isOverModal = true;
//                 updateSwitchBtnsVisibility();
//             });
//             modal.addEventListener('mouseleave', () => {
//                 isOverModal = false;
//                 updateSwitchBtnsVisibility();
//             });
//         });

//         switchBtns.forEach(btn => {
//             btn.addEventListener('mouseenter', () => {
//                 isOverSwitchBtn = true;
//                 updateSwitchBtnsVisibility();
//             });
//             btn.addEventListener('mouseleave', () => {
//                 isOverSwitchBtn = false;
//                 updateSwitchBtnsVisibility();
//             });
//         });
//     }
//     showSwitchBtns();

//     const showModal = () => {
//         projectLinks.forEach(projectLink => {
//             projectLink.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 disableScrolling();
//                 overlay.classList.add('active');
//                 transitionSetting(switchBtns, "var(--quick-transition)");
//                 let projectId = projectLink.dataset.projectLink;
//                 let linkNumber = projectLink.dataset.linkNumber;
//                 modals.forEach(modal => {
//                     if (modal.dataset.modalsId === projectId) {
//                         modal.dataset.modalActive = true;
//                         setTimeout(() => {
//                             modal.style.pointerEvents = "all";
//                         }, 450);
//                         newIndex = linkNumber;
//                     }
//                 })
//             })
//         })
//     }
//     showModal();

//     const disableScrolling = () => {
//         var x = window.scrollX;
//         var y = window.scrollY;
//         window.onscroll = function () { window.scrollTo(x, y); };
//     }

//     const enableScrolling = () => {
//         window.onscroll = function () { };
//     }

//     const closeModal = () => {
//         const closeActiveModal = () => {
//             switchBtns.forEach(btn => btn.classList.remove('active'));
//             overlay.classList.remove('active');
//             let activeModal = document.querySelector('[data-modal-active]');
//             if (activeModal) {
//                 activeModal.style.pointerEvents = "none";
//                 delete activeModal.dataset.modalActive;
//             }
//             enableScrolling();
//             transitionSetting(modalsTransition, "var(--smooth-transition)");
//             transitionSetting(switchBtns, "unset");
//         };

//         overlay.addEventListener('click', closeActiveModal);

//         closeBtns.forEach(btn => {
//             btn.addEventListener('click', closeActiveModal);
//         });
//     }
//     closeModal();

//     const transitionSetting = (elements, transition) => {
//         elements.forEach(elem => elem.style.transition = transition);
//     }

//     const resetModalPointerEvent = (elements, pointerEvents) => {
//         elements.forEach(elem => elem.style.pointerEvents = pointerEvents);
//     }

//     const modalSwitch = () => {
//         switchBtns.forEach(btn => {
//             btn.addEventListener('click', () => {
//                 transitionSetting(modalsTransition, "opacity .6s ease-out, width 0s");
//                 let activeModal = document.querySelector('[data-modal-active]');
//                 if (activeModal) delete activeModal.dataset.modalActive;
//                 newIndex = (btn.dataset.modalButton === "prev") ? (newIndex - 1 + modals.length) % modals.length : (newIndex + 1) % modals.length;
//                 resetModalPointerEvent(modals, "none");
//                 modals[newIndex].dataset.modalActive = true;
//                 modals[newIndex].style.pointerEvents = "all";
//             });
//         });
//     }
//     modalSwitch();

//     const mobileSwipe = () => {
//         let startX = 0;
//         let endX = 0;

//         modals.forEach(modal => {
//             modal.addEventListener('touchstart', (event) => {
//                 startX = event.touches[0].clientX;
//             });

//             modal.addEventListener('touchmove', (event) => {
//                 endX = event.touches[0].clientX;
//             });

//             modal.addEventListener('touchend', () => {
//                 let activeModal = document.querySelector('[data-modal-active]');
//                 transitionSetting(modalsTransition, "opacity .6s ease-out, width 0s");

//                 if (startX > endX + 50) {
//                     if (activeModal) delete activeModal.dataset.modalActive;
//                     newIndex = (newIndex + 1) % modals.length;
//                     resetModalPointerEvent(modals, "none");
//                     modals[newIndex].dataset.modalActive = true;
//                     modals[newIndex].style.pointerEvents = "all";
//                 } else if (startX < endX - 50) {
//                     if (activeModal) delete activeModal.dataset.modalActive;
//                     newIndex = (newIndex - 1 + modals.length) % modals.length;
//                     resetModalPointerEvent(modals, "none");
//                     modals[newIndex].dataset.modalActive = true;
//                     modals[newIndex].style.pointerEvents = "all";
//                 }
//             });
//         });
//     }
//     document.addEventListener('DOMContentLoaded', function () {
//         mobileSwipe();
//     });
// }
// modalsManagement();



const setRightMobileImg = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 550) {
            // veyrat
            const imgIllustrated = document.querySelector('[data-modals-id="modal-5"] .modal_img img');
            const imgToReplace = document.querySelector('[data-modals-id="modal-5"] .modal_left_content img');
            imgToReplace.setAttribute('src', imgIllustrated.src)
            // bartavelle
            const modalImgToChange1 = document.querySelector('[data-modals-id="modal-3"] .modal_left_content img')
            modalImgToChange1.setAttribute('src', '../img/vins/modales/photos/mobile/BARTAVELLE-CARRE.jpg')
            const modalImgToChange2 = document.querySelector('[data-modals-id="modal-8"] .modal_left_content img')
            modalImgToChange2.setAttribute('src', '../img/vins/modales/photos/mobile/PRIMEUR-CARRE.jpg')
            const modalImgToChange3 = document.querySelector('[data-modals-id="modal-12"] .modal_left_content img')
            modalImgToChange3.setAttribute('src', '../img/vins/modales/photos/mobile/BELLE-DES-CLOS-CARRE.jpg')
            const modalImgToChange4 = document.querySelector('[data-modals-id="modal-14"] .modal_left_content img')
            modalImgToChange4.setAttribute('src', '../img/vins/modales/photos/mobile/CHATEAU-JAUNE-CARRE.jpg')
        }
    })
}
setRightMobileImg();

const bars = document.querySelectorAll('.modal__bar');

const sliderImg = () => {
    let clickZone = document.querySelector('.lateral_content');
    let intervalId;

    clickZone.addEventListener("click", () => {
        let transitionDuration = 1;
        const slidesTransition = document.querySelectorAll('.slide');
        const slides = document.querySelector("[data-slides]");
        const slideChildren = [...slides.children].filter(child => !child.matches('button'));
        const activeSlide = document.querySelector("[data-active]");
        transitionSetting(slidesTransition, `${transitionDuration}s`);

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
};
sliderImg();

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
    };
    createIndicators(modals, indicatorsContainer);

    const dots = document.querySelectorAll('.dot');


    const resetActiveDot = () => {
        let activeDot = indicatorsContainer.querySelector('.active');
        if (activeDot) activeDot.classList.remove('active');
    };

    const setActiveModal = (index) => {
        if (index >= modals.length) index = 0;
        if (index < 0) index = modals.length - 1;
        resetModalPointerEvent(modals, "none")
        modals[index].dataset.modalActive = true;
        modals[index].style.pointerEvents = "all";
        return index
    }

    const setActiveBar = () => {
        activeModal = document.querySelector('[data-modal-active]');
        const bar = activeModal.querySelector('.modal__bar');
        bar.classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            // reset bars
            bars.forEach(bar => {
                bar.classList.remove('active');
            })
            newIndex = parseInt(dot.dataset.dotNumber, 10);
            resetActiveDot();
            transitionSetting(modals, "opacity .6s ease-out, width 0s");
            dots[newIndex].classList.add('active');
            activeModal = document.querySelector('[data-modal-active]');
            if (activeModal) delete activeModal.dataset.modalActive;
            modals[newIndex].dataset.modalActive = true;
            modals[newIndex].style.pointerEvents = "all"
            dots[newIndex].classList.add('active');
            setTimeout(() => {
                setActiveBar();
            }, 500);
        });
    });

    if (window.innerWidth > 1300) {
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
        };
        showSwitchBtns();
    }

    const showModal = () => {
        projectLinks.forEach(projectLink => {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                disableScrolling();
                overlay.classList.add('active');
                modalsContainer.classList.add('active');
                transitionSetting(switchBtns, "var(--quick-transition)");
                transitionSetting(modals, "var(--smooth-transition)");
                let projectId = projectLink.dataset.projectLink;
                let linkNumber = projectLink.dataset.linkNumber;
                modals.forEach(modal => {
                    if (modal.dataset.modalsId === projectId) {
                        modal.dataset.modalActive = true;
                        newIndex = linkNumber;
                        setTimeout(() => {
                            modal.style.pointerEvents = "all";
                            indicatorsContainer.style.opacity = ".6";
                            dots[newIndex].classList.add('active');
                            closeBtn.style.transition = "var(--smooth-transition)";
                            closeBtn.style.opacity = 1;
                        }, 450);
                        setTimeout(() => {
                            const bar = modal.querySelector(".modal__bar");
                            bar.classList.add('active');
                        }, 700);
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
            closeBtn.style.transition = "unset";
            closeBtn.style.opacity = 0;
            switchBtns.forEach(btn => {
                btn.classList.remove('active')
            })
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
            // reset bars
            bars.forEach(bar => {
                bar.classList.remove('active');
            })
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
                // bar reset
                bars.forEach(bar => {
                    bar.classList.remove('active');
                })

                if (btn.dataset.modalButton === "prev") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex = newIndex - 1;
                    newIndex = setActiveModal(newIndex);
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                    // bars management
                    setTimeout(() => {
                        setActiveBar();
                    }, 500);
                } else if (btn.dataset.modalButton === "next") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    newIndex = setActiveModal(newIndex);
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                    // bars management
                    setTimeout(() => {
                        setActiveBar();
                    }, 500);
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
                // reset bars
                bars.forEach(bar => {
                    bar.classList.remove('active');
                })


                if (startX > endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    newIndex = setActiveModal(newIndex);
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                    setTimeout(() => {
                        setActiveBar();
                    }, 500);
                } else if (startX < endX) {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex = newIndex - 1;
                    newIndex = setActiveModal(newIndex);
                    resetActiveDot();
                    dots[newIndex].classList.add('active');
                    setTimeout(() => {
                        setActiveBar();
                    }, 500);
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


const setMobileModalsText = () => {
    if (window.innerWidth <= 550) {
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
}

document.addEventListener('DOMContentLoaded', () => {
    setMobileModalsText();
})
const sliderImg = () => {
    let intervalId;

    // const sliderButtons = document.querySelectorAll("[data-carousel-button]");


    // sliderButtons.forEach(sliderButton => {
    //     sliderButton.addEventListener("click", () => {

    //         let transitionDuration = 1;
    //         const slidesTransition = document.querySelectorAll('.slide');
    //         const offset = sliderButton.dataset.carouselButton === "next" ? 1 : -1;
    //         const slides = document.querySelector("[data-slides]");
    //         const slideChildren = [...slides.children].filter(child => !child.matches('button'));
    //         const activeSlide = document.querySelector("[data-active]");
    //         transitionSetting(slidesTransition, `${transitionDuration}s`)

    //         let newIndex = slideChildren.indexOf(activeSlide) + offset;
    //         if (newIndex < 0) newIndex = slideChildren.length - 1;
    //         if (newIndex >= slideChildren.length) newIndex = 0;

    //         slideChildren[newIndex].dataset.active = true;
    //         delete activeSlide.dataset.active;

    //         clearInterval(intervalId);
    //         intervalId = setInterval(switchSlideAutomatically, 3800);
    //     });
    // });

    const switchSlideAutomatically = () => {
        let transitionDuration = 2.5;
        const slidesTransition = document.querySelectorAll('.slide');


        const offset = 1;
        const slides = document.querySelector('[data-slides]');
        const activeSlide = document.querySelector("[data-active]");
        const slider = document.querySelector('.lateral_content')
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

const modalsManagement = () => {
    const modals = document.querySelectorAll('[data-modals-id]');
    const modalsTransition = document.querySelectorAll('.modal_content')
    const projectLinks = document.querySelectorAll('[data-project-link]');
    const overlay = document.querySelector('.modal__overlay');
    const closeBtns = document.querySelectorAll('.modal__btn__close');
    const switchBtns = document.querySelectorAll('.modal-button')

    let newIndex = 0;


    const showModal = () => {
        projectLinks.forEach(projectLink => {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                disableScrolling();
                overlay.classList.add('active')
                switchBtns.forEach(btn => {
                    btn.classList.add('active');
                })
                let projectId = projectLink.dataset.projectLink;
                modals.forEach(modal => {
                    if (modal.dataset.modalsId === projectId) {
                        modal.dataset.modalActive = true;
                    } else {

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

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                closeActiveModal();
            })
        })
        closeActiveModal = () => {
            overlay.classList.remove('active')
            switchBtns.forEach(btn => {
                btn.classList.remove('active');
            })
            let activeModal = document.querySelector('[data-modal-active]');
            if (activeModal) delete activeModal.dataset.modalActive;
            enableScrolling();
            transitionSetting(modalsTransition, "var(--smooth-transition)")
        }
    }
    closeModal();

    const transitionSetting = (elements, transition) => {
        elements.forEach(elem =>
            elem.style.transition = transition
        )
    }

    const modalSwitch = () => {

        switchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                transitionSetting(modalsTransition, "opacity .6s ease-out, width 0s");
                let activeModal = document.querySelector('[data-modal-active]');


                if (btn.dataset.modalButton === "next") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex++;
                    if (newIndex >= modals.length) newIndex = 0;
                    modals[newIndex].dataset.modalActive = true;
                }
                else if (btn.dataset.modalButton === "prev") {
                    if (activeModal) delete activeModal.dataset.modalActive;
                    newIndex--;
                    if (newIndex < 0) newIndex = modals.length - 1;
                    modals[newIndex].dataset.modalActive = true;
                }
            })
        })
    }
    modalSwitch();

    const mobileSwipe = () => {
        document.addEventListener('DOMContentLoaded', function () {
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
                    let activeModal = document.querySelector('[data-modal-active]');
                    transitionSetting(modalsTransition, "opacity .6s ease-out, width 0s")


                    if (startX > endX + 50) {
                        if (activeModal) delete activeModal.dataset.modalActive;
                        newIndex++;
                        if (newIndex >= modals.length) newIndex = 0;
                        modals[newIndex].dataset.modalActive = true;
                    } else if (startX < endX - 50) {
                        if (activeModal) delete activeModal.dataset.modalActive;
                        newIndex--;
                        if (newIndex < 0) newIndex = modals.length - 1;
                        modals[newIndex].dataset.modalActive = true;
                    }
                });
            });
        });
    }
    mobileSwipe();
}
modalsManagement();

const setMobileImgVeyrat = () => {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= 550) {
            const imgIllustrated = document.querySelector('[data-modals-id="modal-5"] .modal_img img');
            const imgToReplace = document.querySelector('[data-modals-id="modal-5"] .modal_left_content img');
            imgToReplace.setAttribute('src', imgIllustrated.src)
        }
    })
}
setMobileImgVeyrat();
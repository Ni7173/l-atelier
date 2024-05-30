const sliderImg = () => {
    let intervalId;

    const sliderButtons = document.querySelectorAll("[data-carousel-button]");


    sliderButtons.forEach(sliderButton => {
        sliderButton.addEventListener("click", () => {

            let transitionDuration = 1;
            const slidesTransition = document.querySelectorAll('.slide');
            const offset = sliderButton.dataset.carouselButton === "next" ? 1 : -1;
            const slides = document.querySelector("[data-slides]");
            const slideChildren = [...slides.children].filter(child => !child.matches('button'));
            const activeSlide = document.querySelector("[data-active]");
            transitionSetting(slidesTransition, `${transitionDuration}s`)

            let newIndex = slideChildren.indexOf(activeSlide) + offset;
            if (newIndex < 0) newIndex = slideChildren.length - 1;
            if (newIndex >= slideChildren.length) newIndex = 0;

            slideChildren[newIndex].dataset.active = true;
            delete activeSlide.dataset.active;

            clearInterval(intervalId);
            intervalId = setInterval(switchSlideAutomatically, 3800);
        });
    });

    const transitionSetting = (elements, duration) => {
        elements.forEach(elem =>
            elem.style.transitionDuration = duration
        )
    }

    const switchSlideAutomatically = () => {
        let transitionDuration = 2.5;
        const slidesTransition = document.querySelectorAll('.slide');


        const offset = 1;
        const slides = document.querySelector('[data-slides]');
        const activeSlide = document.querySelector("[data-active]");
        const slider = document.querySelector('.lateral_content')
        const slideChildren = [...slides.children].filter(child => !child.matches('button'));

        // console.log(slideChildren)

        transitionSetting(slidesTransition, `${transitionDuration}s`);
        let newIndex = slideChildren.indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slideChildren.length - 1;
        if (newIndex >= slideChildren.length) newIndex = 0;

        slideChildren[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    };

    document.addEventListener('DOMContentLoaded', () => {
        intervalId = setInterval(switchSlideAutomatically, 3800);
    });
}

sliderImg();


// modals

const modalsManagement = () => {
    const modals = document.querySelectorAll('[data-modals-id]');
    const projectLinks = document.querySelectorAll('[data-project-link]');
    const overlay = document.querySelector('.modal__overlay')
    const closeBtns = document.querySelectorAll('.modal__btn__close')

    const showModal = () => {
        projectLinks.forEach(projectLink => {
            projectLink.addEventListener('click', (e) => {
                e.preventDefault();
                disableScrolling();
                overlay.classList.add('active')
                let projectId = projectLink.dataset.projectLink;
                modals.forEach(modal => {
                    if (modal.dataset.modalsId === projectId) {
                        modal.classList.add('active')
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
            overlay.classList.remove('active')
        })

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                closeActiveModal();
                overlay.classList.remove('active')
            })
        })
        closeActiveModal = () => {
            let activeModal = document.querySelector('.project_modal.active')
            activeModal.classList.remove('active')
            enableScrolling();
        }
    }
    closeModal();

}
modalsManagement();
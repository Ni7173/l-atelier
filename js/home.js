document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    // setVideo();
})


const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.home__text #switching-text');
    const texts = ["accueillant", "de création", "chaleureux", "d'échange", "de conception", "bienveillant", "d'écoute"];

    let newIndex = 0;

    const changeText = () => {


        setTimeout(() => {
            switchingTxt.innerText = texts[newIndex];
            switchingTxt.style.opacity = 1;
            switchingTxt.style.width = "100%";
            switchingTxt.style.transition = "width 3s ease";
        }, 800);

        setTimeout(() => {
            if (newIndex > texts.length - 2) newIndex = 0;
            else newIndex++;
        }, 2500);

        switchingTxt.style.opacity = 0;
        switchingTxt.style.transition = "opacity 0.2s ease-in-out"; // Short transition duration for opacity

        setTimeout(() => {
            switchingTxt.style.width = "0%"
        }, 200);

    }

    // Trigger the changeText function at an interval
    setInterval(changeText, 4500); // Interval set to 5000ms (5 seconds) for text change
}

switchingTxtOperator();



const setStarAnimation = () => {
    const star = document.querySelector('.logo__star');
    star.style.animation = "turningStar 2.5s infinite";
}

const setVideo = () => {
    const video = document.querySelector('.hero__video');

    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('muted', '');
}
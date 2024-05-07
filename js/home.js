document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    // setStarAnimation();
})

const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.home__text #switching-text');
    const texts = ["accueillant", "créatif", "chaleureux", "d'échange", "de conception", "bienveillant"];

    let newIndex = 0;

    const changeText = () => {
        switchingTxt.style.opacity = 0;
        // switchingTxt.style.width = "0%";
        setTimeout(() => {
            switchingTxt.innerText = texts[newIndex];
            switchingTxt.style.opacity = 1;
            // switchingTxt.style.width = "100%";
            if (newIndex > texts.length - 2) newIndex = 0
            else newIndex++
        }, 600);
    }

    setInterval(changeText, 4000);
}

const setStarAnimation = () => {
    const star = document.querySelector('.logo__star');
    star.style.animation = "turningStar 2.5s infinite";
}
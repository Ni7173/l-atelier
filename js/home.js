document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    setStarAnimation();
})

const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.home__text #switching-text');
    const texts = ["bonheur", "simplicité", "travail", "authenticité", "bien-être", "création"];

    let newIndex = 0;

    const changeText = () => {
        switchingTxt.style.opacity = 0;
        setTimeout(() => {
            switchingTxt.innerText = texts[newIndex];
            switchingTxt.style.opacity = 1;
            if (newIndex > texts.length - 2) newIndex = 0
            else newIndex++
        }, 400);
    }

    setInterval(changeText, 2500);
}

// const setStarAnimation = () => {
//     const star = document.querySelector('.jumping__star');
//     star.style.animation = "jumpingStar 2.5s infinite";
// }
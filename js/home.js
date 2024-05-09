document.addEventListener('DOMContentLoaded', () => {
    switchingTxtOperator();
    // setStarAnimation();
})

const switchingTxtOperator = () => {
    let switchingTxt = document.querySelector('.home__text #switching-text');
    // let container = document.querySelector('.home__text');
    // let txtBefore = document.createElement('div');
    const texts = ["accueillant", "créatif", "chaleureux", "d'échange", "de conception", "bienveillant"];

    // console.log(container.childNodes[1])

    // txtBefore.style.position = 'absolute';
    // txtBefore.style.content = ' ';
    // txtBefore.style.width = "100%";
    // txtBefore.style.top = '0';
    // txtBefore.style.right = '0';
    // txtBefore.style.bottom = '0';
    // txtBefore.style.backgroundColor = 'linear-gradient(90deg,transparent 0%, #000 15%, #000 100%);';
    // container.insertBefore(txtBefore, container.childNodes[1])

    let newIndex = 0;

    const changeText = () => {
        switchingTxt.style.opacity = 0;
        switchingTxt.style.width = "0%"
        // switchingTxt.childNodes[0].style.animation = "switchingTxtAppear 1.5s ease-out forwards"
        setTimeout(() => {
            switchingTxt.innerText = texts[newIndex];
            switchingTxt.style.opacity = 1;
            switchingTxt.style.width = "100%";
            // switchingTxt.style.overflow = "unset";
            if (newIndex > texts.length - 2) newIndex = 0
            else newIndex++
        }, 1000);
    }

    setInterval(changeText, 4000);
}

const setStarAnimation = () => {
    const star = document.querySelector('.logo__star');
    star.style.animation = "turningStar 2.5s infinite";
}
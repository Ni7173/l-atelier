const transitionSetting = (elements, transition) => {
    elements.forEach(element => {
        element.style.transition = transition;
    })
}
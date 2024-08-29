const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const textInput = document.getElementById('message');
const telInput = document.getElementById('tel');
const mailInput = document.getElementById('email');
const errorContainer = document.querySelector('.error__container')
let errorMessage = document.getElementById('error');

const contactRequired = () => {
    form.addEventListener('submit', (e) => {

        const pushErrorMessage = () => {
            if (errorMessage.classList.contains('active') == false) {
                errorContainer.style.display = "block";
                errorMessage.classList.add('active');
            }
            e.preventDefault();
        }

        if (nameInput.value === "" || nameInput.value == null) {
            pushErrorMessage();
        }

        if (textInput.value.length <= 5) {
            pushErrorMessage();
        }

        if (mailInput.value.length <= 5 && telInput.value.length <= 5) {
            pushErrorMessage();
        }
    })
}
contactRequired();

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 550) {
        const setRightImage = () => {
            const map = document.querySelector('.contact__map');
            map.setAttribute('src', '../../img/contact/PLAN-MONTMEYRAN-MOBILE.jpg')
        }
        setRightImage();
    }
})
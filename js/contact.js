const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const textInput = document.getElementById('message');
const telInput = document.getElementById('tel');
const mailInput = document.getElementById('email');
const errorContainer = document.querySelector('.error__container')
let errorMessage = document.getElementById('error');

const contactRequired = () => {
    form.addEventListener('submit', (e) => {
        let messages = [];
        if (nameInput.value === "" || nameInput.value == null) {
            messages.push("veuillez entrer votre nom");
        }

        if (textInput.value.length <= 5) {
            messages.push("veuillez indiquer votre projet")
        }

        if (mailInput.value.length == 0 && telInput.value.length == 0) {
            messages.push("veuillez m'indiquer comment vous recontacter")
        }

        if (messages.length > 0) {
            e.preventDefault();
            errorMessage.innerText = messages.join(', ')
        }
    })
}
contactRequired();
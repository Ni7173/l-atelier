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
                e.preventDefault();
                errorMessage.classList.add('active');
            }
        }
        if (nameInput.value === "" || nameInput.value == null) {
            pushErrorMessage();
        }

        if (textInput.value.length <= 5) {
            pushErrorMessage();
        }
    })
}
contactRequired();
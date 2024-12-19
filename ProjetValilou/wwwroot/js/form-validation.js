document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const messageInput = document.getElementById('message');

    // Regex pour validation
    const regexNom = /^(?![A-Z]{1}$)([A-ZÀ-ÿ][a-zà-ÿ]+(?: [A-ZÀ-ÿ][a-zà-ÿ]+)*)$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelephone = /^(0[1-9][ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2})$/;

    // Validation individuelle des champs
    function validateNom() {
        const nom = nomInput.value.trim();
        if (regexNom.test(nom)) {
            document.getElementById('nomError').textContent = '';
            return true;
        } else {
            document.getElementById('nomError').textContent = 'Veuillez entrer un nom valide (ex: Dupont Nicola).';
            return false;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        if (regexEmail.test(email)) {
            document.getElementById('emailError').textContent = '';
            return true;
        } else {
            document.getElementById('emailError').textContent = 'Veuillez entrer une adresse e-mail valide (ex: exemple@gmail.com).';
            return false;
        }
    }

    function validateTelephone() {
        const telephone = telephoneInput.value.trim();
        if (regexTelephone.test(telephone)) {
            document.getElementById('telephoneError').textContent = '';
            return true;
        } else {
            document.getElementById('telephoneError').textContent = 'Veuillez entrer un numéro de téléphone valide (ex: 03-12-12-09).';
            return false;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        const hasValidContent = /\b[A-Za-zÀ-ÿ]{2,}\b/.test(message);

        if (message.length > 10 && hasValidContent) {
            document.getElementById('messageError').textContent = '';
            return true;
        } else {
            if (message.length <= 10) {
                document.getElementById('messageError').textContent = 'Le message doit contenir au moins 10 caractères.';
            } else {
                document.getElementById('messageError').textContent = 'Le message doit contenir au moins un mot valide.';
            }
            return false;
        }
    }

    // Validation complète du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const isNomValid = validateNom();
        const isEmailValid = validateEmail();
        const isTelephoneValid = validateTelephone();
        const isMessageValid = validateMessage();

        if (isNomValid && isEmailValid && isTelephoneValid && isMessageValid) {
            form.submit();
        }
    });

    // Écouteurs pour valider au fur et à mesure que l'utilisateur tape
    nomInput.addEventListener('input', validateNom);
    emailInput.addEventListener('input', validateEmail);
    telephoneInput.addEventListener('input', validateTelephone);
    messageInput.addEventListener('input', validateMessage);
});

// Affiche un message pour indiquer que le script est chargé
console.log("Script de validation chargé");
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Sélectionne le formulaire
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const messageInput = document.getElementById('message');

document.getElementById("contactForm").addEventListener("submit", function (event) {
    let isValid = true;
    // Regular expressions for validation
    const regexNom = /^(?![A-Z]{1}$)([A-ZÀ-ÿ][a-zà-ÿ]+(?: [A-ZÀ-ÿ][a-zà-ÿ]+)*)$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelephone = /^(0[1-9][ .]?[0-9]{2}[ .]?[0-9]{2}[ .]?[0-9]{2}[ .]?[0-9]{2})$/;

    // Réinitialiser les messages d'erreur
    document.getElementById("nomError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("telephoneError").textContent = "";
    document.getElementById("objetError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("consentementError").textContent = "";

    // Validation du nom
    const nom = document.getElementById("nom").value.trim();
    if (!nom) {
        document.getElementById("nomError").textContent = "Le nom est requis.";
        isValid = false;
    }

    // Validation de l'email
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Veuillez entrer un email valide.";
        isValid = false;
    }
    // Function to display error messages
    const showError = (elementId, message) => {
        document.getElementById(elementId).textContent = message;
    };

    // Validation functions
    const validateNom = () => {
        const nom = nomInput.value.trim();
        if (regexNom.test(nom)) {
            showError('nomError', '');
            return true;
        }
        showError('nomError', 'Veuillez entrer un nom valide (ex: Dupont Nicola).');
        return false;
    };


    // Validation du téléphone
    const telephone = document.getElementById("telephone").value.trim();
    if (!telephone) {
        document.getElementById("telephoneError").textContent = "Le numéro de téléphone est requis.";
        isValid = false;
    }

    // Validation de l'objet
    const objet = document.getElementById("Objet").value;
    if (!objet) {
        document.getElementById("objetError").textContent = "L'objet est requis.";
        isValid = false;
    }

    function validateTelephone() {
        const telephone = telephoneInput.value.trim();
        if (regexTelephone.test(telephone)) {
            document.getElementById('telephoneError').textContent = '';
            return true;
        } else {
            document.getElementById('telephoneError').textContent = 'Veuillez entrer un numéro de téléphone valide (ex: 03.12.12.09).';
            return false;
        }
    // Validation du message
    const message = document.getElementById("message").value.trim();
    if (!message) {
        document.getElementById("messageError").textContent = "Le message est requis.";
        isValid = false;
    }

    // Validation du consentement
    const consentement = document.getElementById("Consentement").checked;
    if (!consentement) {
        document.getElementById("consentementError").textContent = "Vous devez accepter les conditions.";
        isValid = false;
    function validateMessage() {
        const message = messageInput.value.trim();
        const hasValidContent = /\b[A-Za-zÀ-ÿ]{2,}\b/.test(message); // Vérifie s'il y a au moins un mot valide

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

    // Si le formulaire n'est pas valide, empêcher l'envoi
    if (!isValid) {
        event.preventDefault();
    }
});
    // Validation complète du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche l'envoi par défaut pour tester dans la console
        const isNomValid = validateNom();
        const isEmailValid = validateEmail();
        const isTelephoneValid = validateTelephone();
        const isMessageValid = validateMessage();

        if (isNomValid && isEmailValid && isTelephoneValid && isMessageValid) {
            form.submit(); // Envoie le formulaire si toutes les validations sont bonnes
        }
    });

    // Écouteurs pour valider au fur et à mesure que l'utilisateur tape
    nomInput.addEventListener('input', validateNom);
    emailInput.addEventListener('input', validateEmail);
    telephoneInput.addEventListener('input', validateTelephone);
    messageInput.addEventListener('input', validateMessage);
});

// Affiche un message pour indiquer que le script est chargé
console.log("Script de validation chargé");

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("contactForm"); // Sélectionne le formulaire
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const telephoneInput = document.getElementById('telephone');
    const messageInput = document.getElementById('message');
    const objetInput = document.getElementById('Objet');
    const consentementInput = document.getElementById('Consentement');
    const submitButton = form.querySelector('button[type="submit"]'); // Bouton de soumission

    // Expressions régulières pour la validation
    const regexNom = /^(?![A-Z]{1}$)([A-ZÀ-ÿ][a-zà-ÿ]+(?: [A-ZÀ-ÿ][a-zà-ÿ]+)*)$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regexTelephone = /^(0[1-9][ .]?[0-9]{2}[ .]?[0-9]{2}[ .]?[0-9]{2}[ .]?[0-9]{2})$/;

    // Fonction pour afficher les messages d'erreur
    const showError = (elementId, message) => {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none'; // Affiche ou masque l'erreur
    };

    // Validation des champs
    const validateNom = () => {
        const nom = nomInput.value.trim();
        const isValid = regexNom.test(nom);
        showError('nomError', isValid ? '' : 'Veuillez entrer un nom valide (ex: Dupont Nicola).');
        return isValid;
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();
        const isValid = regexEmail.test(email);
        showError('emailError', isValid ? '' : 'Veuillez entrer un email valide.');
        return isValid;
    };

    const validateTelephone = () => {
        const telephone = telephoneInput.value.trim();
        const isValid = regexTelephone.test(telephone);
        showError('telephoneError', isValid ? '' : 'Veuillez entrer un numéro de téléphone valide (ex: 03.12.12.09).');
        return isValid;
    };

    const validateMessage = () => {
        const message = messageInput.value.trim();
        const hasValidContent = /\b[A-Za-zÀ-ÿ]{2,}\b/.test(message);
        const isValid = message.length > 10 && hasValidContent;
        showError('messageError', isValid ? '' : message.length <= 10
            ? 'Le message doit contenir au moins 10 caractères.'
            : 'Le message doit contenir au moins un mot valide.');
        return isValid;
    };

    const validateObjet = () => {
        const isValid = objetInput.value !== '';
        showError('objetError', isValid ? '' : 'Veuillez sélectionner un objet.');
        return isValid;
    };

    const validateConsentement = () => {
        const isValid = consentementInput.checked;
        showError('consentementError', isValid ? '' : 'Vous devez accepter les conditions.');
        return isValid;
    };

    // Validation complète du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche l'envoi par défaut pour tester dans la console
        const isValid = validateNom() && validateEmail() && validateTelephone() &&
            validateMessage() && validateObjet() && validateConsentement();

        if (isValid) {
            console.log('Formulaire validé');
            // Affichage d'un message de succès ici, si nécessaire
            form.submit(); // Envoie le formulaire si toutes les validations sont bonnes
        }
    });

    // Écouteurs pour valider au fur et à mesure que l'utilisateur tape
    nomInput.addEventListener('input', validateNom);
    emailInput.addEventListener('input', validateEmail);
    telephoneInput.addEventListener('input', validateTelephone);
    messageInput.addEventListener('input', validateMessage);
    objetInput.addEventListener('change', validateObjet);
    consentementInput.addEventListener('change', validateConsentement);
});

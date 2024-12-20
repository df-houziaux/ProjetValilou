// Affiche un message pour indiquer que le script est chargé
console.log("Script de validation chargé");

document.getElementById("contactForm").addEventListener("submit", function (event) {
    let isValid = true;

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
    }

    // Si le formulaire n'est pas valide, empêcher l'envoi
    if (!isValid) {
        event.preventDefault();
    }
});

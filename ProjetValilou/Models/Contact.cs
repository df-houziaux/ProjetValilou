using System.ComponentModel.DataAnnotations;

namespace ProjetValilou.Models
{
    public class ContactViewModel
    {
        [Required(ErrorMessage = "Le nom est requis.")]
        [RegularExpression(@"^[A-Z][a-zA-Z\s]*$", ErrorMessage = "Le nom doit commencer par une majuscule et ne peut contenir que des lettres et des espaces.")]
        public string Nom { get; set; }

        [Required(ErrorMessage = "L'adresse e-mail est requise.")]
        [EmailAddress(ErrorMessage = "Adresse e-mail invalide.")]
        public string Email { get; set; }

        [RegularExpression(@"^\+?[0-9]*$", ErrorMessage = "Le numéro de téléphone doit être valide.")]
        public string Telephone { get; set; }

        [Required(ErrorMessage = "L'objet est requis.")]
        public string Objet { get; set; }

        [Required(ErrorMessage = "Le message est requis.")]
        [StringLength(500, ErrorMessage = "Le message ne peut pas dépasser 500 caractères.")]
        public string Message { get; set; }

        [Required(ErrorMessage = "Vous devez accepter les conditions.")]
        public bool Consentement { get; set; }
    }
}


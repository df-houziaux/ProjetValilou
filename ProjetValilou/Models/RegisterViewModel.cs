using System.ComponentModel.DataAnnotations;

namespace ProjetValilou.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Le nom complet est requis.")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "L'adresse e-mail est requise.")]
        [EmailAddress(ErrorMessage = "L'adresse e-mail n'est pas valide.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Le mot de passe est requis.")]
        [StringLength(100, ErrorMessage = "Le mot de passe doit avoir au moins {2} caractères.", MinimumLength = 6)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Veuillez confirmer votre mot de passe.")]
        [Compare("Password", ErrorMessage = "Les mots de passe ne correspondent pas.")]
        public string ConfirmPassword { get; set; }
    }
}

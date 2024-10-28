using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetValilou.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Le nom est requis.")]
        public required string Name { get; set; }

        public string? ImageUrl { get; set; }
        public string? Description { get; set; }

        [Range(0.01, double.MaxValue, ErrorMessage = "Le prix doit être supérieur à zéro.")]
        public decimal Price { get; set; }

        // Propriété pour les ingrédients
        public string? Ingredients { get; set; } // Vous pouvez aussi utiliser une liste si besoin

        // Nouvelle propriété pour la catégorie
        [Required(ErrorMessage = "La catégorie est requise.")]
        public string? Category { get; set; } // Ajouter la catégorie
    }
}

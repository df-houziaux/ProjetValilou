// Fichier: Models/Product.cs
namespace ProjetValilou.Models
{
    public class Product
    {
        public int Id { get; set; } // Identifiant unique pour chaque produit
        public string Name { get; set; } // Nom du produit
        public string ImageUrl { get; set; } // URL de l'image du produit
        public string Description { get; set; } // Description du produit (optionnel)
        public decimal Price { get; set; } // Prix du produit (optionnel)
    }
}

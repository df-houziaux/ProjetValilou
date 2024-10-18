using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProjetValilou.Controllers
{
    public class ProductsController : Controller
    {
        // Liste statique pour simuler une base de données
        private static List<Product> AllProducts = new List<Product>
        {
            // Bougies Lavande (existantes)
            new Product { Id = 12, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 15.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 13, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 16.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 14, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 17.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 15, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 18.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 16, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 19.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 17, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 20.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 18, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 21.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 19, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 22.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 20, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 23.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 21, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 24.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 22, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 25.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 23, Name = "Bougie Lavande ", ImageUrl = "/images/Lavande.jpg", Description = "Bougie parfumée à la Lavande ", Price = 26.99m, Ingredients = "Lavande, Cire de soja" },
           

            // Bougies Vanille
            new Product { Id = 12, Name = "Bougie Vanille ", ImageUrl = "/images/vanille1.jpg", Description = "Bougie parfumée à la vanille ", Price = 15.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 13, Name = "Bougie Vanille ", ImageUrl = "/images/vanille2.jpg", Description = "Bougie parfumée à la vanille ", Price = 16.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 14, Name = "Bougie Vanille ", ImageUrl = "/images/vanille3.jpg", Description = "Bougie parfumée à la vanille ", Price = 17.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 15, Name = "Bougie Vanille ", ImageUrl = "/images/vanille4.jpg", Description = "Bougie parfumée à la vanille ", Price = 18.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 16, Name = "Bougie Vanille ", ImageUrl = "/images/vanille5.jpg", Description = "Bougie parfumée à la vanille ", Price = 19.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 17, Name = "Bougie Vanille ", ImageUrl = "/images/vanille6.jpg", Description = "Bougie parfumée à la vanille ", Price = 20.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 18, Name = "Bougie Vanille ", ImageUrl = "/images/vanille7.jpg", Description = "Bougie parfumée à la vanille ", Price = 21.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 19, Name = "Bougie Vanille ", ImageUrl = "/images/vanille8.jpg", Description = "Bougie parfumée à la vanille ", Price = 22.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 20, Name = "Bougie Vanille ", ImageUrl = "/images/vanille9.jpg", Description = "Bougie parfumée à la vanille ", Price = 23.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 21, Name = "Bougie Vanille ", ImageUrl = "/images/vanille10.jpg", Description = "Bougie parfumée à la vanille ", Price = 24.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 22, Name = "Bougie Vanille ", ImageUrl = "/images/vanille11.jpg", Description = "Bougie parfumée à la vanille ", Price = 25.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 23, Name = "Bougie Vanille ", ImageUrl = "/images/vanille12.jpg", Description = "Bougie parfumée à la vanille ", Price = 26.99m, Ingredients = "Vanille, Cire de soja" },

            // Bougies Rosée
            new Product { Id = 24, Name = "Bougie Rosée ", ImageUrl = "/images/rosee1.jpg", Description = "Bougie parfumée à la rosée ", Price = 17.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 25, Name = "Bougie Rosée ", ImageUrl = "/images/rosee2.jpg", Description = "Bougie parfumée à la rosée ", Price = 18.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 26, Name = "Bougie Rosée ", ImageUrl = "/images/rosee3.jpg", Description = "Bougie parfumée à la rosée ", Price = 19.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 27, Name = "Bougie Rosée ", ImageUrl = "/images/rosee4.jpg", Description = "Bougie parfumée à la rosée ", Price = 20.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 28, Name = "Bougie Rosée ", ImageUrl = "/images/rosee5.jpg", Description = "Bougie parfumée à la rosée ", Price = 21.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 29, Name = "Bougie Rosée ", ImageUrl = "/images/rosee6.jpg", Description = "Bougie parfumée à la rosée ", Price = 22.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 30, Name = "Bougie Rosée ", ImageUrl = "/images/rosee7.jpg", Description = "Bougie parfumée à la rosée ", Price = 23.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 31, Name = "Bougie Rosée ", ImageUrl = "/images/rosee8.jpg", Description = "Bougie parfumée à la rosée ", Price = 24.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 32, Name = "Bougie Rosée ", ImageUrl = "/images/rosee9.jpg", Description = "Bougie parfumée à la rosée ", Price = 25.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 33, Name = "Bougie Rosée ", ImageUrl = "/images/rosee10.jpg", Description = "Bougie parfumée à la rosée ", Price = 26.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 34, Name = "Bougie Rosée ", ImageUrl = "/images/rosee11.jpg", Description = "Bougie parfumée à la rosée ", Price = 27.99m, Ingredients = "Rosée, Cire de soja" },
            new Product { Id = 35, Name = "Bougie Rosée ", ImageUrl = "/images/rosee12.jpg", Description = "Bougie parfumée à la rosée ", Price = 28.99m, Ingredients = "Rosée, Cire de soja" }
        };

        // Afficher tous les produits
        public IActionResult Index()
        {
            return View(AllProducts);
        }

        // Afficher les produits de la catégorie "Lavande"
        public IActionResult Category1()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Lavande")).ToList();
            return View("Category", products);  // Renvoie la vue 'Category' avec tous les produits de la catégorie Lavande
        }

        // Afficher les produits de la catégorie "Vanille"
        public IActionResult Category2()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Vanille")).ToList();
            return View("Category", products);
        }

        // Afficher les produits de la catégorie "Rosée"
        public IActionResult Category3()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Rosée")).ToList();
            return View("Category", products);
        }
       
    }
}

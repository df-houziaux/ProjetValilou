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
            new Product { Id = 1, Name = "Bougie Lavande 1", ImageUrl = "/images/lavande1.jpg", Description = "Bougie parfumée à la lavande 1", Price = 12.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 2, Name = "Bougie Lavande 2", ImageUrl = "/images/lavande2.jpg", Description = "Bougie parfumée à la lavande 2", Price = 13.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 3, Name = "Bougie Lavande 3", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 3", Price = 14.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 4, Name = "Bougie Lavande 4", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 4", Price = 15.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 5, Name = "Bougie Lavande 5", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 5", Price = 12.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 6, Name = "Bougie Lavande 6", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 6", Price = 13.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 7, Name = "Bougie Lavande 7", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 7", Price = 16.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 8, Name = "Bougie Lavande 8", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 8", Price = 18.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 9, Name = "Bougie Lavande 9", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 9", Price = 22.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 10, Name = "Bougie Lavande 10", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 10", Price = 19.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 11, Name = "Bougie Lavande 11", ImageUrl = "/images/lavande3.jpg", Description = "Bougie parfumée à la lavande 11", Price = 21.99m, Ingredients = "Lavande, Cire de soja" },
            new Product { Id = 12, Name = "Bougie Vanille 12", ImageUrl = "/images/vanille.jpg", Description = "Bougie parfumée à la vanille", Price = 15.99m, Ingredients = "Vanille, Cire de soja" },
            new Product { Id = 13, Name = "Bougie Rosée 13", ImageUrl = "/images/rosee.jpg", Description = "Bougie parfumée à la rosée", Price = 17.99m, Ingredients = "Rosée, Cire de soja" }
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

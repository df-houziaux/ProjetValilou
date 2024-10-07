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
            new Product { Id = 1, Name = "Bougie Lavande", ImageUrl = "/images/lavande.jpg", Description = "Bougie parfumée à la lavande", Price = 12.99m },
            new Product { Id = 2, Name = "Bougie Vanille", ImageUrl = "/images/vanille.jpg", Description = "Bougie parfumée à la vanille", Price = 15.99m },
            new Product { Id = 3, Name = "Bougie Rosée", ImageUrl = "/images/rosee.jpg", Description = "Bougie parfumée à la rosée", Price = 17.99m }
        };

        public IActionResult Index()
        {
            return View(AllProducts);
        }

        public IActionResult Category1()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Lavande")).ToList();
            return View("Category", products);
        }

        public IActionResult Category2()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Vanille")).ToList();
            return View("Category", products);
        }

        public IActionResult Category3()
        {
            var products = AllProducts.Where(p => p.Name.Contains("Rosée")).ToList();
            return View("Category", products);
        }
    }
}

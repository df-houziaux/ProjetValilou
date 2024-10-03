using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Models;
using System.Diagnostics;
using System.Collections.Generic; // Assurez-vous d'inclure cette directive

namespace ProjetValilou.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            // Récupération des trois dernières créations
            var latestProducts = GetLatestProducts();
            return View(latestProducts);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private List<Product> GetLatestProducts()
        {
            // Remplacez ceci par la logique pour obtenir les données réelles depuis votre base de données
            return new List<Product>
        {
        new Product { Name = "Bougie 1", ImageUrl = "bougie1.jpg" },
        new Product { Name = "Bougie 2", ImageUrl = "bougie2.jpg" },
        new Product { Name = "Bougie 3", ImageUrl = "bougie3.jpg" }
        };
        }

    }
}

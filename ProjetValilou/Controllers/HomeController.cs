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
            // R�cup�ration des trois derni�res cr�ations
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
            // Remplacez ceci par la logique pour obtenir les donn�es r�elles depuis votre base de donn�es
            return new List<Product>
        {
        new Product { Name = "Savon 1", ImageUrl = "img_carrousel_1.jpg" },
        new Product { Name = "Savon 2", ImageUrl = "img_carrousel_2.jpg" },
        new Product { Name = "Savon 3", ImageUrl = "img_carrousel_3.jpg" }
        };
        }

    }
}

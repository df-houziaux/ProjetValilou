using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetValilou.Data;  // Ensure you have the correct using directive for your DbContext

namespace ProjetValilou.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject the DbContext
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Afficher tous les produits
        public async Task<IActionResult> Index()
        {
            var allProducts = await _context.Products.ToListAsync(); // Retrieve all products from the database
            return View(allProducts);
        }

        // Afficher les produits de la catégorie "Lavande"
        public async Task<IActionResult> Category1()
        {
            ViewBag.Category = "category1";  // Ajout du nom de la catégorie
            var products = await _context.Products
                .Where(p => p.Name.Contains("Lavande"))
                .ToListAsync();
            return View("Category", products);
        }

        public async Task<IActionResult> Category2()
        {
            ViewBag.Category = "category2";
            var products = await _context.Products
                .Where(p => p.Name.Contains("Vanille"))
                .ToListAsync();
            return View("Category", products);
        }

        public async Task<IActionResult> Category3()
        {
            ViewBag.Category = "category3";
            var products = await _context.Products
                .Where(p => p.Name.Contains("Rosée"))
                .ToListAsync();
            return View("Category", products);
        }
    }
}

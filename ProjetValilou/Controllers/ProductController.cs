using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProjetValilou.Data;
using ProjetValilou.Models;

namespace ProjetValilou.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Afficher les produits par catégories
        public async Task<IActionResult> Category1()
        {
            ViewBag.Category = "category1";
            var products = await _context.Products.Where(p => p.Name.Contains("Lavande")).ToListAsync();
            return View("Category", products);
        }

        public async Task<IActionResult> Category2()
        {
            ViewBag.Category = "category2";
            var products = await _context.Products.Where(p => p.Name.Contains("Vanille")).ToListAsync();
            return View("Category", products);
        }

        public async Task<IActionResult> Category3()
        {
            ViewBag.Category = "category3";
            var products = await _context.Products.Where(p => p.Name.Contains("Vanille")).ToListAsync();
            return View("Category", products);
        }

        // Vérifie la disponibilité d'un produit avant de l'ajouter au panier
        [HttpPost]
        public IActionResult CheckProductAvailability(int productId, int quantity)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == productId);
            if (product == null)
            {
                return NotFound("Produit non trouvé.");
            }

            if (product.Stock < quantity)
            {
                return BadRequest("Rupture de stock pour cet article.");
            }

            // Réduire le stock du produit
            product.Stock -= quantity;
            _context.SaveChanges();  // Enregistrez les changements dans la base de données

            return Ok("Produit ajouté au panier.");
        }

        // API pour sauvegarder le panier dans la session
        [HttpPost("/api/cart/save")]
        public IActionResult SaveCart([FromBody] List<CartItem> cartDetails)
        {
            var cartJson = JsonConvert.SerializeObject(cartDetails);
            HttpContext.Session.SetString("CartDetails", cartJson);
            return Ok();
        }

        // Afficher la page de paiement
        public IActionResult Payment()
        {
            var cartItems = GetCartFromSession();
            return View(cartItems);
        }

        // Récupérer le panier depuis la session
        private List<CartItem> GetCartFromSession()
        {
            var cartJson = HttpContext.Session.GetString("CartDetails");
            return string.IsNullOrEmpty(cartJson) ? new List<CartItem>() : JsonConvert.DeserializeObject<List<CartItem>>(cartJson);
        }
    }

}

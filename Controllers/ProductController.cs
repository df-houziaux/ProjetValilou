﻿using Microsoft.AspNetCore.Mvc;
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

        // Afficher les produits par catégories, mais tous les produits sont récupérés
        public async Task<IActionResult> Category1()
        {
            ViewBag.Category = "category1";
            var products = await _context.Products.ToListAsync();
            return View("Category", products);
        }

        public async Task<IActionResult> Category2()
        {
             ViewBag.Category = "category2";
            var products = await _context.Products.ToListAsync(); 
            return View("Category", products);
        }

        public async Task<IActionResult> Category3()
        {
            ViewBag.Category = "category3";
            var products = await _context.Products.ToListAsync();
            return View("Category", products);
        }

        // Nouvelle méthode pour rechercher des produits
        [HttpGet("/api/products/search")]
        public async Task<IActionResult> Search(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("La requête de recherche ne peut pas être vide.");
            }

            var products = await _context.Products
                .Where(p => p.Name.Contains(query) || p.Ingredients.Contains(query))
                .ToListAsync();

            return Ok(products);
        }

        // API pour sauvegarder le panier dans la session
        [HttpPost("/api/cart/save")]
        public IActionResult SaveCart([FromBody] List<CartItem> cartDetails)
        {
            var cartJson = JsonConvert.SerializeObject(cartDetails);
            HttpContext.Session.SetString("CartDetails", cartJson);
            return Ok();
        }

        // API pour récupérer les niveaux de stock
        [HttpGet("/api/products/stock")]
        public IActionResult GetStockLevels()
        {
            var stockLevels = _context.Products.Select(p => new { p.Name, p.Stock }).ToList();
            return Ok(stockLevels);
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

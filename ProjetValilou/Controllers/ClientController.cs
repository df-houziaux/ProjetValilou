using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Data;
using ProjetValilou.Models; // S'assurer que ce namespace est correct pour RegisterViewModel

namespace ProjetValilou.Controllers
{
    public class ClientController : Controller
    {

        private readonly ApplicationDbContext _context;

        public ClientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /Account/Register
        [HttpGet]
        public IActionResult Inscription()
        {
            // Retourne la vue Register.cshtml
            return View();
        }

        // POST: /Account/Register
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(Client model)
        {
            if (ModelState.IsValid)
            {
                // Traiter l'inscription ici (sauvegarde dans la base de données, etc.)
                _context.Clients.Add(model);
                _context.SaveChanges();

                // Redirection après inscription réussie
                return RedirectToAction("Index", "Home");
            }

            // Si la validation échoue, on retourne à la vue avec les erreurs
            return View(model);
        }
    }
}

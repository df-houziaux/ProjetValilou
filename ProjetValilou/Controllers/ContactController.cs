using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Models;

namespace ProjetValilou.Controllers
{
    public class ContactController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View(new ContactViewModel());
        }

        [HttpPost]
        public IActionResult Index(ContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Traitez les données du formulaire (par exemple, envoyer un e-mail)
                return RedirectToAction("Confirmation");
            }
            return View(model);
        }

        public IActionResult Confirmation()
        {
            return View();
        }
    }
}

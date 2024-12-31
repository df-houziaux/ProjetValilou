using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Models;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net;

public class ContactController : Controller
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IConfiguration configuration, ILogger<ContactController> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Index(ContactViewModel model)
    {
        if (ModelState.IsValid)
        {
            try
            {
                if (!model.Consentement)
                {
                    ModelState.AddModelError("", "Vous devez donner votre consentement pour envoyer un message.");
                    return View(model);
                }

                bool isMailSent = await SendMailAsync(model);
                if (isMailSent)
                {
                    TempData["Success"] = "Votre message a été envoyé avec succès.";
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError("", "L'email n'a pas pu être envoyé. Veuillez réessayer.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Erreur lors de l'envoi de l'email : {ex.Message}");
                ModelState.AddModelError("", "Une erreur interne s'est produite. Veuillez réessayer plus tard.");
            }
        }
        else
        {
            // Log les erreurs de validation du modèle
            foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
            {
                _logger.LogWarning($"Erreur de modèle : {error.ErrorMessage}");
            }
        }

        return View(model);
    }

    private async Task<bool> SendMailAsync(ContactViewModel model)
    {
        try
        {
            var apiKey = _configuration["SendGrid:ApiKey"];
            if (string.IsNullOrWhiteSpace(apiKey))
            {
                throw new InvalidOperationException("La clé API de SendGrid est introuvable dans la configuration.");
            }

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("david.houziaux@wanadoo.fr", "Contact Valilou");
            var to = new EmailAddress("david.houziaux@wanadoo.fr");
            var subject = "Nouveau message de contact";
            var plainTextContent = $"Nom : {model.Name}\nEmail : {model.Email}\nTéléphone : {model.Telephone}\nObjet : {model.Objet}\nMessage : {model.Message}";
            var htmlContent = $"<p><strong>Nom :</strong> {model.Name}</p>" +
                              $"<p><strong>Email :</strong> {model.Email}</p>" +
                              $"<p><strong>Téléphone :</strong> {model.Telephone}</p>" +
                              $"<p><strong>Objet :</strong> {model.Objet}</p>" +
                              $"<p><strong>Message :</strong> {model.Message}</p>";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);

            var response = await client.SendEmailAsync(msg);
            var responseBody = await response.Body.ReadAsStringAsync();

            if (response.StatusCode == HttpStatusCode.OK || response.StatusCode == HttpStatusCode.Accepted)
            {
                return true;
            }
            else
            {
                throw new Exception($"Echec de l'envoi de l'e-mail. Statut : {response.StatusCode}. Détails : {responseBody}");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError($"Erreur d'envoi de l'email : {ex.Message}");
            throw;
        }
    }
}

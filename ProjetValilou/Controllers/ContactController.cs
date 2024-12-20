﻿using Microsoft.AspNetCore.Mvc;
using ProjetValilou.Models;
using System;
using System.Net;
using System.Net.Mail;

namespace ProjetValilou.Controllers
{
    public class ContactController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            // Affiche la page de formulaire
            return View();
        }

        [HttpPost]
        public IActionResult Index(ContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Envoi de l'email
                    bool isMailSent = SendMail(model);

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
                    // Gestion des exceptions et affichage d'un message d'erreur
                    ModelState.AddModelError("", "Une erreur est survenue lors de l'envoi de l'email : " + ex.Message);
                }
            }

            // Si le modèle est invalide ou en cas d'erreur, recharge la vue avec les erreurs
            return View(model);
        }

        /// <summary>
        /// Envoie un email avec les informations du modèle de contact
        /// </summary>
        /// <param name="model">Modèle contenant les informations de contact</param>
        /// <returns>Booléen indiquant si l'email a été envoyé avec succès</returns>
        private bool SendMail(ContactViewModel model)
        {
            try
            {
                using (MailMessage mailMessage = new MailMessage())
                {
                    // Configuration du message
                    mailMessage.From = new MailAddress("df.houziaux@gmail.com");
                    mailMessage.To.Add("david.houziaux@wanadoo.fr");
                    mailMessage.Subject = "Nouveau message de contact";
                    mailMessage.IsBodyHtml = true;
                    mailMessage.Body = $"<p><strong>Nom :</strong> {model.Name}</p>" +
                                       $"<p><strong>Email :</strong> {model.Email}</p>" +
                                       $"<p><strong>Téléphone :</strong> {model.Telephone}</p>" +
                                       $"<p><strong>Objet :</strong> {model.Objet}</p>" +
                                       $"<p><strong>Message :</strong> {model.Message}</p>";

                    // Configuration du client SMTP
                    using (SmtpClient smtpClient = new SmtpClient("smtp.simply.com", 587))
                    {
                        smtpClient.Credentials = new NetworkCredential("david.houziaux@wanadoo.fr", "Les12calamity"); // Remplacez par vos identifiants SMTP
                        smtpClient.EnableSsl = true;

                        // Envoi de l'email
                        smtpClient.Send(mailMessage);
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                // Journalisez ou affichez l'erreur pour le débogage
                Console.WriteLine("Erreur lors de l'envoi de l'email : " + ex.Message);
                return false;
            }
        }
    }
}

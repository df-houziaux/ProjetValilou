using Microsoft.EntityFrameworkCore;
using ProjetValilou.Models; // Assurez-vous que vous avez importé votre modèle PaymentInfo
using System.Collections.Generic;

namespace ProjetValilou.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructeur du DbContext
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet pour les modèles existants
        public DbSet<Product> Products { get; set; }
        public DbSet<Client> Clients { get; set; }

        // DbSet pour le modèle PaymentInfo
        public DbSet<PaymentInfo> PaymentInfos { get; set; } // Ajoutez ceci

        // Configuration de la base de données
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Valilou;Trusted_Connection=True;MultipleActiveResultSets=True");
            }
        }
    }
}

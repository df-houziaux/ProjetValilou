using Microsoft.EntityFrameworkCore;
using ProjetValilou.Models;
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

        // DbSet pour le modèle Product
        public DbSet<Product> Products { get; set; }

        public DbSet<Client> Clients { get; set; }

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

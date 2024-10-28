using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProjetValilou.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetValilou.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            // Check if the database has been created
            context.Database.EnsureCreated();

            await context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Products");

            // Check if products already exist
            if (context.Products.Any())
            {
                return; // Database has been seeded
            }

            var products = new[]
            {
            new Product { Name = "Bougie Lavande 1", ImageUrl = "/images/bougielavande1.jpg", Description = "Bougie parfumée à la Lavande", Price = 15.99m, Ingredients = "Lavande, Cire de soja", Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 2", ImageUrl = "/images/bougielavande2.jpg", Description = "Bougie parfumée à la Lavande", Price = 16.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 3", ImageUrl = "/images/bougielavande3.jpg", Description = "Bougie parfumée à la Lavande", Price = 17.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 4", ImageUrl = "/images/bougielavande4.jpg", Description = "Bougie parfumée à la Lavande", Price = 18.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 5", ImageUrl = "/images/bougielavande5.jpg", Description = "Bougie parfumée à la Lavande", Price = 19.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 6", ImageUrl = "/images/bougielavande6.jpg", Description = "Bougie parfumée à la Lavande", Price = 20.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 7", ImageUrl = "/images/bougielavande7.jpg", Description = "Bougie parfumée à la Lavande", Price = 21.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 8", ImageUrl = "/images/bougielavande8.jpg", Description = "Bougie parfumée à la Lavande", Price = 22.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 9", ImageUrl = "/images/bougielavande9.jpg", Description = "Bougie parfumée à la Lavande", Price = 23.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 10", ImageUrl = "/images/bougielavande10.jpg", Description = "Bougie parfumée à la Lavande", Price = 24.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 11", ImageUrl = "/images/bougielavande11.jpg", Description = "Bougie parfumée à la Lavande", Price = 25.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },
            new Product { Name = "Bougie Lavande 12", ImageUrl = "/images/bougielavande12.jpg", Description = "Bougie parfumée à la Lavande", Price = 26.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },


            // Bougies Vanille
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille1.jpg", Description = "Bougie parfumée à la vanille ", Price = 15.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2" },
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille2.jpg", Description = "Bougie parfumée à la vanille ", Price = 16.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2" },
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille3.jpg", Description = "Bougie parfumée à la vanille ", Price = 17.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille4.jpg", Description = "Bougie parfumée à la vanille ", Price = 18.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille5.jpg", Description = "Bougie parfumée à la vanille ", Price = 19.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille6.jpg", Description = "Bougie parfumée à la vanille ", Price = 20.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille7.jpg", Description = "Bougie parfumée à la vanille ", Price = 21.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille8.jpg", Description = "Bougie parfumée à la vanille ", Price = 22.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille9.jpg", Description = "Bougie parfumée à la vanille ", Price = 23.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille10.jpg", Description = "Bougie parfumée à la vanille ", Price = 24.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille11.jpg", Description = "Bougie parfumée à la vanille ", Price = 25.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "Bougie Vanille ", ImageUrl = "/images/bougievanille12.jpg", Description = "Bougie parfumée à la vanille ", Price = 26.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},

            // Bougies Rosée
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee1.jpg", Description = "Bougie parfumée à la rosée ", Price = 17.99m, Ingredients = "Rosée, Cire de soja" , Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee2.jpg", Description = "Bougie parfumée à la rosée ", Price = 18.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee3.jpg", Description = "Bougie parfumée à la rosée ", Price = 19.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee4.jpg", Description = "Bougie parfumée à la rosée ", Price = 20.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee5.jpg", Description = "Bougie parfumée à la rosée ", Price = 21.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee6.jpg", Description = "Bougie parfumée à la rosée ", Price = 22.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee7.jpg", Description = "Bougie parfumée à la rosée ", Price = 23.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee8.jpg", Description = "Bougie parfumée à la rosée ", Price = 24.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee9.jpg", Description = "Bougie parfumée à la rosée ", Price = 25.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee10.jpg", Description = "Bougie parfumée à la rosée ", Price = 26.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee11.jpg", Description = "Bougie parfumée à la rosée ", Price = 27.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "Bougie Rosée ", ImageUrl = "/images/bougierosee12.jpg", Description = "Bougie parfumée à la rosée ", Price = 28.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"}
            };

            Console.WriteLine("Seeding data...");

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
            Console.WriteLine("Data seeded successfully.");
        }
    }
}

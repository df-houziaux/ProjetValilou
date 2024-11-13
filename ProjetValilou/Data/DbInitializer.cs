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
            new Product { Name = "Savon lavande 1", ImageUrl = "/images/savonlavande1.jpg", Description = "savon parfumée à la Lavande", Price = 15.99m, Ingredients = "Lavande, Cire de soja", Category="Catégorie 1"  },
            new Product { Name = "Savon Lavande 2", ImageUrl = "/images/savonlavande2.jpg", Description = "savon parfumée à la Lavande", Price = 16.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "Savon Lavande 3", ImageUrl = "/images/savonlavande3.jpg", Description = "savon parfumée à la Lavande", Price = 17.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 4", ImageUrl = "/images/savonlavande4.jpg", Description = "savon parfumée à la Lavande", Price = 18.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 5", ImageUrl = "/images/savonlavande5.jpg", Description = "savon parfumée à la Lavande", Price = 19.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 6", ImageUrl = "/images/savonlavande6.jpg", Description = "savon parfumée à la Lavande", Price = 20.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 7", ImageUrl = "/images/savonlavande7.jpg", Description = "savon parfumée à la Lavande", Price = 21.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 8", ImageUrl = "/images/savonlavande8.jpg", Description = "savon parfumée à la Lavande", Price = 22.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 9", ImageUrl = "/images/savonlavande9.jpg", Description = "savon parfumée à la Lavande", Price = 23.99m, Ingredients = "Lavande, Cire de soja"    ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 10", ImageUrl = "/images/savonlavande10.jpg", Description = "savon parfumée à la Lavande", Price = 24.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 11", ImageUrl = "/images/savonlavande11.jpg", Description = "savon parfumée à la Lavande", Price = 25.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },
            new Product { Name = "savon Lavande 12", ImageUrl = "/images/savonlavande12.jpg", Description = "savon parfumée à la Lavande", Price = 26.99m, Ingredients = "Lavande, Cire de soja" ,Category="Catégorie 1"  },


            // savons Vanille
            new Product { Name = "savon Vanille 1", ImageUrl = "/images/savonvanille1.jpg", Description = "savon parfumée à la vanille ", Price = 15.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2" },
            new Product { Name = "savon Vanille 2", ImageUrl = "/images/savonvanille2.jpg", Description = "savon parfumée à la vanille ", Price = 16.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2" },
            new Product { Name = "savon Vanille 3", ImageUrl = "/images/savonvanille3.jpg", Description = "savon parfumée à la vanille ", Price = 17.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 4", ImageUrl = "/images/savonvanille4.jpg", Description = "savon parfumée à la vanille ", Price = 18.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 5", ImageUrl = "/images/savonvanille5.jpg", Description = "savon parfumée à la vanille ", Price = 19.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 6", ImageUrl = "/images/savonvanille6.jpg", Description = "savon parfumée à la vanille ", Price = 20.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 7", ImageUrl = "/images/savonvanille7.jpg", Description = "savon parfumée à la vanille ", Price = 21.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 8", ImageUrl = "/images/savonvanille8.jpg", Description = "savon parfumée à la vanille ", Price = 22.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 9", ImageUrl = "/images/savonvanille9.jpg", Description = "savon parfumée à la vanille ", Price = 23.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 10", ImageUrl = "/images/savonvanille10.jpg", Description = "savon parfumée à la vanille ", Price = 24.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 11", ImageUrl = "/images/savonvanille11.jpg", Description = "savon parfumée à la vanille ", Price = 25.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},
            new Product { Name = "savon Vanille 12", ImageUrl = "/images/savonvanille12.jpg", Description = "savon parfumée à la vanille ", Price = 26.99m, Ingredients = "Vanille, Cire de soja" ,Category="Catégorie 2"},

            // savons Rosée
            new Product { Name = "savon Rosée 1", ImageUrl = "/images/savonrosée1.jpg", Description = "savon parfumée à la rosée ", Price = 17.99m, Ingredients = "Rosée, Cire de soja" , Category="Catégorie 3"},
            new Product { Name = "savon Rosée 2", ImageUrl = "/images/savonrosée2.jpg", Description = "savon parfumée à la rosée ", Price = 18.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 3", ImageUrl = "/images/savonrosée3.jpg", Description = "savon parfumée à la rosée ", Price = 19.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 4", ImageUrl = "/images/savonrosée4.jpg", Description = "savon parfumée à la rosée ", Price = 20.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 5", ImageUrl = "/images/savonrosée5.jpg", Description = "savon parfumée à la rosée ", Price = 21.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 6", ImageUrl = "/images/savonrosée6.jpg", Description = "savon parfumée à la rosée ", Price = 22.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 7", ImageUrl = "/images/savonrosée7.jpg", Description = "savon parfumée à la rosée ", Price = 23.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 8", ImageUrl = "/images/savonrosée8.jpg", Description = "savon parfumée à la rosée ", Price = 24.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 9", ImageUrl = "/images/savonrosée9.jpg", Description = "savon parfumée à la rosée ", Price = 25.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 10", ImageUrl = "/images/savonrosée10.jpg", Description = "savon parfumée à la rosée ", Price = 26.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 11", ImageUrl = "/images/savonrosée11.jpg", Description = "savon parfumée à la rosée ", Price = 27.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"},
            new Product { Name = "savon Rosée 12", ImageUrl = "/images/savonrosée12.jpg", Description = "savon parfumée à la rosée ", Price = 28.99m, Ingredients = "Rosée, Cire de soja" ,Category="Catégorie 3"}
            };

            Console.WriteLine("Seeding data...");

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
            Console.WriteLine("Data seeded successfully.");
        }
    }
}

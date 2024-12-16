using Microsoft.EntityFrameworkCore;
using ProjetValilou.Data;
using ProjetValilou.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Ajouter la gestion des sessions
builder.Services.AddDistributedMemoryCache();  // Utilisation de la mémoire pour stocker les sessions
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);  // Durée d'expiration de la session
    options.Cookie.HttpOnly = true;  // Le cookie ne sera accessible que via le serveur (pour la sécurité)
    options.Cookie.IsEssential = true;  // Marquer ce cookie comme essentiel
});

// Add other services like controllers, Razor Pages, etc.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Activer la gestion des sessions
app.UseSession();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Call the DbInitializer to seed data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        await DbInitializer.Initialize(services);
    }
    catch (Exception ex)
    {
        // Handle exceptions (e.g., log the error)
        Console.WriteLine(ex.Message);
    }
}

app.Run();

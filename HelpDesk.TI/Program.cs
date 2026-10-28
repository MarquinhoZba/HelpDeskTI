using HelpDesk.TI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configuração do banco MySQL
var connectionString = builder.Configuration.GetConnectionString("HelpDeskConnection");

builder.Services.AddDbContext<HelpDeskDbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    )
);

var app = builder.Build();

// Teste de conexão com o banco de dados
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<HelpDeskDbContext>();

    try
    {
        if (db.Database.CanConnect())
        {
            Console.WriteLine("=================================");
            Console.WriteLine("CONEXÃO COM MYSQL OK!");
            Console.WriteLine("Banco: helpdesk_ti");
            Console.WriteLine("=================================");
        }
        else
        {
            Console.WriteLine("=================================");
            Console.WriteLine("NÃO FOI POSSÍVEL CONECTAR AO MYSQL.");
            Console.WriteLine("=================================");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("=================================");
        Console.WriteLine("ERRO NA CONEXÃO COM MYSQL:");
        Console.WriteLine(ex.Message);
        Console.WriteLine("=================================");
    }
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
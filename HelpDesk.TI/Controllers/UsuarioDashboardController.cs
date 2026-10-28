using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.TI.Controllers
{
    public class UsuarioDashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
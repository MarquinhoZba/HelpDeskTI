using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.TI.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.TI.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
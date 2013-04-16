namespace DemoApplication.Controllers.SecurityX
{
    using System.Web.Mvc;

    public class SecurityController : Controller
    {
        [Authorize(Roles = "Super Admin"), HttpGet]
        public ActionResult Index()
        {
            return View();
        }

    }
}

namespace DemoApplication.Controllers.Employee
{
    using System.Web.Mvc;

    public class EmployeeController : Controller
    {
        [HttpGet]
        public ActionResult Index(int id)
        {
            return View(id);
        }
    }
}

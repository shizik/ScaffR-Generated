namespace DemoApplication.Controllers.Employee
{
    using System.Web.Mvc;

    public class EmployeeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return PartialView();
        }

        [HttpGet]
        public ActionResult Detail()
        {
            return PartialView();
        }
    }
}

using System.Web.Mvc;

namespace DemoApplication.Controllers.Employees
{
    public class EmployeesController : Controller
    {
        //
        // GET: /Employees/

        public ActionResult Index(int id)
        {
            return View();
        }
    }
}

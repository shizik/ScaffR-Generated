using System.Web.Mvc;

namespace DemoApplication.Controllers.Tasks
{
    public partial class TasksController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OnDemand(int id)
        {
            return View();
        }
    }
}

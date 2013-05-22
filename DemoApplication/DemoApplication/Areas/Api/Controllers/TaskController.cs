namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TaskController : ApiController
    {
        //
        // GET ~/api/Task/Get/1

        public Task Get(string id)
        {
            return null;
        }
    }
}

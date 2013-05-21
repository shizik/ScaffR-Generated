namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Web.Http;
    using Infrastructure.Data;

    public class CategoryController : ApiController
    {
        //
        // GET ~/api/Category

        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Task_Category_GetAll", commandType: CommandType.StoredProcedure);
            }
        }
    }
}

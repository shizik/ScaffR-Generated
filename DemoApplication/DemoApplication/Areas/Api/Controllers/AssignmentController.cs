namespace DemoApplication.Areas.Api.Controllers
{
    using System.Data;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class AssignmentController : ApiController
    {
        public int Put(AssignmentSave entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Assignment_Create", entity, commandType: CommandType.StoredProcedure);
            }
        }

        public int Post(AssignmentSave entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Assignment_Update", entity, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

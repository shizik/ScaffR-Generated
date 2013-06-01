namespace DemoApplication.Areas.Api.Controllers
{
    using Infrastructure.Data;
    using Models;
    using Newtonsoft.Json.Linq;
    using System.Data;
    using System.Linq;
    using System.Web.Http;

    public class AssignmentController : ApiController
    {
        public Assignment Get(int id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Assignment_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var assignment = result.Read<Assignment>().Single();

                return assignment;
            }
        }

        public int Put(Assignment entity)
        {
            using (var db = new DapperDatabase())
            {
                return (int)db.Connection.Query<decimal>("Assignment_Add", entity, commandType: CommandType.StoredProcedure).First();
            }
        }

        [HttpPut]
        public int AddFromTask(AssignmentSave entity)
        {
            using (var db = new DapperDatabase())
            {
                return (int)db.Connection.Query<decimal>("Employee_AddTask", entity, commandType: CommandType.StoredProcedure).First();
            }
        }

        public int Post(Assignment entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Assignment_Update", entity, commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Assignment_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        [HttpPost]
        public Assignment Complete(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Assignment>("Assignment_Complete", new { Id = id }, commandType: CommandType.StoredProcedure).First();
            }
        }

    }
}

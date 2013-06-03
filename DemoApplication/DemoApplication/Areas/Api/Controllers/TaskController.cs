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
        public Task Get(int id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Task_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var team = result.Read<Task>().Single();

                return team;
            }
        }

        [HttpGet]
        public IEnumerable<TaskBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TaskBrief>("Task_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public int NumberOfRelatedTasks(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<int>("Task_GetNumberOfRelatedTasks", new { Id = id }, commandType: CommandType.StoredProcedure).First();
            }
        }

        [HttpGet]
        public IEnumerable<Task> Available()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Task>("Task_GetAvailable", commandType: CommandType.StoredProcedure);
            }
        }

        public int Put(Task entity)
        {
            using (var db = new DapperDatabase())
            {
                return (int)db.Connection.Query<decimal>("Task_Add", entity, commandType: CommandType.StoredProcedure).First();
            }
        }

        public int Post(TaskUpdate entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Task_Update", entity, commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Task_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

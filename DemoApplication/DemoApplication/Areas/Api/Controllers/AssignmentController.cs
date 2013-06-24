namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Helpers;
    using Infrastructure.Data;
    using Models;

    public class AssignmentController : ApiController
    {
        public Assignment Get(int id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Assignment_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var assignment = result.Read<Assignment>().Single();

                db.Connection.LogActivity(ActivityActions.View, id);

                return assignment;
            }
        }

        public dynamic Get(int id, string employeeId)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Assignment_GetByIdEmployeeId",
                                                         new { Id = id, EmployeeId = employeeId },
                                                         commandType: CommandType.StoredProcedure);

                var dataResult = new
                {
                    Assignment = result.Read<Assignment>().Single(),
                    Activity = result.Read<Activity>().ToList()
                };


                db.Connection.LogActivity(ActivityActions.View, id);

                return dataResult;
            }
        }

        [HttpGet]
        public IEnumerable<FilesStatus> Attachments(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<FilesStatus>("Assignment_GetAttachments", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        public int Put(Assignment entity)
        {
            using (var db = new DapperDatabase())
            {
                int id = db.Connection.Query<int>("Assignment_Add", entity, commandType: CommandType.StoredProcedure).Single();

                db.Connection.LogActivity(ActivityActions.Create, id);

                return id;
            }
        }

        [HttpPut]
        public int AddFromTask(AssignmentSave entity)
        {
            using (var db = new DapperDatabase())
            {
                var transaction = db.Connection.BeginTransaction();

                int id = db.Connection.Query<int>("Employee_AddTask",
                                                           entity,
                                                           commandType: CommandType.StoredProcedure,
                                                           transaction: transaction).Single();

                db.Connection.LogActivity(ActivityActions.Create, id, transaction: transaction);

                transaction.Commit();

                return id;
            }
        }

        public int Post(Assignment entity)
        {
            using (var db = new DapperDatabase())
            {
                int id = db.Connection.Execute("Assignment_Update", entity, commandType: CommandType.StoredProcedure);

                db.Connection.LogActivity(ActivityActions.Update, entity.Id);

                return id;
            }
        }

        public void Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Assignment_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);

                db.Connection.LogActivity(ActivityActions.Delete, id);
            }
        }

        [HttpPost]
        public Assignment Complete(int id, string employeeId)
        {
            using (var db = new DapperDatabase())
            {
                var assignment = db.Connection.Query<Assignment>("Assignment_Complete",
                                                       new { Id = id, EmployeeId = employeeId },
                                                       commandType: CommandType.StoredProcedure).First();

                db.Connection.LogActivity(ActivityActions.Complete, id);

                return assignment;
            }
        }
    }
}

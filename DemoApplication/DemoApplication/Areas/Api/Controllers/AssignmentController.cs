namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Helpers;
    using Infrastructure.Data;
    using Models;

    public class AssignmentController : UploadControllerBase
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
                    Attachments = result.Read<File>().ToList(),
                    Activity = result.Read<Activity>().ToList()
                };

                db.Connection.LogActivity(ActivityActions.View, id);

                return dataResult;
            }
        }

        [HttpGet]
        public IEnumerable<File> Attachments(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<File>("Assignment_GetAttachments", new { Id = id }, commandType: CommandType.StoredProcedure);
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

                int id = db.Connection.Query<int>("Task_Add",
                                                  Task.FromAssignmentSave(entity),
                                                  commandType: CommandType.StoredProcedure,
                                                  transaction: transaction).Single();

                var assignment = Assignment.FromAssignmentSave(entity);
                assignment.TaskId = id;

                id = db.Connection.Query<int>("Assignment_Add",
                                                  assignment,
                                                  commandType: CommandType.StoredProcedure,
                                                  transaction: transaction).Single();


                db.Connection.LogActivity(ActivityActions.Create, id, transaction: transaction);

                transaction.Commit();
                transaction.Dispose();

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
                var transaction = db.Connection.BeginTransaction();
                var assignment = db.Connection.Query<Assignment>("Assignment_Complete",
                                                       new { Id = id, EmployeeId = employeeId },
                                                       commandType: CommandType.StoredProcedure,
                                                       transaction: transaction).Single();

                db.Connection.LogActivity(ActivityActions.Complete, id, transaction: transaction);

                transaction.Commit();
                transaction.Dispose();

                return assignment;
            }
        }

        [HttpPost]
        public dynamic Upload(int id)
        {
            using (var db = new DapperDatabase())
            {
                var transaction = db.Connection.BeginTransaction();

                var files = UploadFile(db.Connection, transaction);

                foreach (var file in files)
                {
                    db.Connection.Execute("Assignment_AddAttachment",
                                          new { Id = id, AttachmentId = file.Id, IsUpload = true },
                                          commandType: CommandType.StoredProcedure,
                                          transaction: transaction);

                    file.IsUpload = true;
                }

                db.Connection.LogActivity(ActivityActions.Update, id, transaction: transaction);

                transaction.Commit();
                transaction.Dispose();

                return new
                {
                    Files = files
                };
            }
        }
    }
}

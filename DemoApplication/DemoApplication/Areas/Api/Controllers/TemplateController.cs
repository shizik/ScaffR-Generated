namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TemplateController : ApiController
    {
        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Template_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public IEnumerable<TemplateBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TemplateBrief>("Template_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

        public Template Get(int id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Template_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var template = result.Read<Template>().Single();
                template.Departments = result.Read<Department>().ToList();
                template.Positions = result.Read<Position>().ToList();
                template.Tasks = result.Read<Task>().ToList();

                return template;
            }
        }

        [HttpPost]
        public void AddTask(Task entity)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_AddTask", entity, commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public int Apply(int id, string employeeId)
        {
            using (var db = new DapperDatabase())
            {
                return (int)db.Connection.Query<decimal>("Template_Apply",
                                                         new { Id = id, EmployeeId = employeeId },
                                                         commandType: CommandType.StoredProcedure)
                                         .First();
            }
        }

        public int Put(Template entity)
        {
            using (var db = new DapperDatabase())
            {
                return (int)db.Connection.Query<decimal>("Template_Add", entity, commandType: CommandType.StoredProcedure).First();
            }
        }

        public int Post(Template entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Template_Update", entity, commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        //
        // Departments

        [HttpGet]
        public void ApplyToDepartment(int id, string departmentId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_ApplyToDepartment",
                                      new { Id = id, DepartmentId = departmentId },
                                      commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public void AddDepartment(int id, string departmentId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_AddDepartment",
                                      new { Id = id, DepartmentId = departmentId },
                                      commandType: CommandType.StoredProcedure);
            }
        }

        [HttpPost]
        public IEnumerable<Department> AddAllDepartment(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Department>("Template_AddAllDepartment",
                                                       new { Id = id },
                                                       commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public void DeleteDepartment(int id, string departmentId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_DeleteDepartment",
                                      new { Id = id, DepartmentId = departmentId },
                                      commandType: CommandType.StoredProcedure);
            }
        }

        //
        // Positions

        [HttpGet]
        public void ApplyToPosition(int id, string positionId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_ApplyToPosition",
                                      new { Id = id, PositionId = positionId },
                                      commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public void AddPosition(int id, string positionId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_AddPosition",
                                      new { Id = id, PositionId = positionId },
                                      commandType: CommandType.StoredProcedure);
            }
        }

        [HttpPost]
        public IEnumerable<Position> AddAllPosition(int id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Position>("Template_AddAllPosition",
                                                       new { Id = id },
                                                       commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public void DeletePosition(int id, string positionId)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_DeletePosition",
                                      new { Id = id, PositionId = positionId },
                                      commandType: CommandType.StoredProcedure);
            }
        }
    }
}

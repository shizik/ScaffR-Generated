namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class EmployeeController : ApiController
    {
        [HttpGet]
        public dynamic Brief()
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Employee_GetBrief", commandType: CommandType.StoredProcedure);

                return new
                {
                    Employees = result.Read<EmployeeBrief>().ToList(),
                    Departments = result.Read<dynamic>().ToList()
                };
            }
        }

        public Employee Get(string id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Employee_GetById", new { EmployeeId = id }, commandType: CommandType.StoredProcedure);

                var employee = result.Read<Employee>().Single();
                employee.Tasks = result.Read<Assignment>().ToList();
                employee.AppliedTemplates = result.Read<int>().ToList();

                return employee;
            }
        }

        [HttpGet]
        public dynamic GetMilestoneValue(string id, int milestoneId)
        {
            using (var db = new DapperDatabase())
            {
                var date = db.Connection.Query<DateTime>("Employee_GetMilestoneValue",
                                                     new { Id = id, MilestoneId = milestoneId },
                                                     commandType: CommandType.StoredProcedure)
                                    .First();

                return new { Date = date };
            }
        }

        [HttpGet]
        public IEnumerable<Activity> GetActivity(string id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Activity>("Employee_GetActivity", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

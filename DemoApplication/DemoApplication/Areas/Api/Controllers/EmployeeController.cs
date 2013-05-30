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
        public IEnumerable<EmployeeBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<EmployeeBrief>("Employee_GetBrief", commandType: CommandType.StoredProcedure);
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
        public string GetMilestoneValue(string id, int milestoneId)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<DateTime>("Employee_GetMilestoneValue",
                                                     new { Id = id, MilestoneId = milestoneId },
                                                     commandType: CommandType.StoredProcedure)
                                    .First().ToShortDateString();
            }
        }
    }
}

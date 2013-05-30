namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class ApproverController : ApiController
    {
        [HttpGet]
        public IEnumerable<ApproverBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<ApproverBrief>("Approver_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

        public Employee Get(string id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Employee_GetById", new { EmployeeId = id }, commandType: CommandType.StoredProcedure);

                var employee = result.Read<Employee>().Single();
                //TODO: These fields are not in the database
                employee.Title = "This is a title";
                employee.Email = "email@example.com";

                employee.Tasks = result.Read<Assignment>().ToList();

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

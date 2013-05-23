namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class EmployeeController : ApiController
    {
        //
        // GET ~/api/Employee/Brief

        [HttpGet]
        public IEnumerable<EmployeeBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<EmployeeBrief>("Employee_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

        //
        // GET ~/api/Employee/1

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
    }
}

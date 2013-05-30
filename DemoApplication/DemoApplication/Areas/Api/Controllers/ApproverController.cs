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

        public Approver Get(string id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Approver_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var approver = result.Read<Approver>().Single();
                approver.Tasks = result.Read<Approver.Assignment>().ToList();

                return approver;
            }
        }

        [HttpGet]
        public Approver MyTasks()
        {
            // TODO: Get the Id from the logged in user
            return Get("D1BKRHX3X5A3GJI3QARHFUKRC4VYTF");
        }
    }
}

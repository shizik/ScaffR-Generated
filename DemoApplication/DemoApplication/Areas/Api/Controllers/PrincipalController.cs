namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class PrincipalController : ApiController
    {
        [HttpGet]
        public IEnumerable<Principal> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Principal>("Principal_GetAvailable", commandType: CommandType.StoredProcedure);
            }
        }
    }
}

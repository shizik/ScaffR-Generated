namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class PositionController : ApiController
    {
        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Position_GetAll", commandType: CommandType.StoredProcedure);
            }
        }
    }
}

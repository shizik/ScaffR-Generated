﻿namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TaskController : ApiController
    {
        public Task Get(string id)
        {
            return null;
        }

        [HttpGet]
        public IEnumerable<Task> Available()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Task>("Task_GetAvailable", commandType: CommandType.StoredProcedure);
            }
        }
    }
}

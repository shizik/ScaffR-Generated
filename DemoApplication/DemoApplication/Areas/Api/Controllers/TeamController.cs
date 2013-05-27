namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TeamController : ApiController
    {
        //
        // GET ~/api/Team

        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Template_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        //
        // GET ~/api/Team/Brief

        [HttpGet]
        public IEnumerable<TeamBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TeamBrief>("Team_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }
        
        //
        // GET ~/api/Team/Get/1

        public Team Get(string id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Team_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var team = result.Read<Team>().Single();
                team.Members = result.Read<Team.Member>().ToList();
                team.Tasks = result.Read<Team.Assignment>().ToList();

                return team;
            }
        }
    }
}

namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TeamController : ApiController
    {
        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Template_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public IEnumerable<TeamBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TeamBrief>("Team_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

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

        public string Put(Team entity)
        {
            using (var db = new DapperDatabase())
            {
                entity.Id = Guid.NewGuid().ToString().Substring(0, 30);

                db.Connection.Execute("Team_Add", entity, commandType: CommandType.StoredProcedure);

                return entity.Id;
            }
        }

        public int Post(Team entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Team_Update", entity, commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Team_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

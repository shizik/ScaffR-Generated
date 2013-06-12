namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;
    using Helpers;

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

                db.Connection.LogActivity(ActivityActions.View, teamId: id);

                return team;
            }
        }

        [HttpGet]
        public IEnumerable<Activity> GetActivity(string id)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Activity>("Team_GetActivity", new { Id = id }, commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public dynamic GetAvailableMembers(string id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Team_GetAvailableMembers", new { Id = id }, commandType: CommandType.StoredProcedure);

                var teams = result.Read<dynamic>().ToList();
                var departments = result.Read<dynamic>().ToList();
                var employees = result.Read<dynamic>().ToList();
                var admins = result.Read<dynamic>().ToList();

                return new
                    {
                        Teams = teams,
                        Departments = departments,
                        Employees = employees,
                        Admins = admins
                    };
            }
        }

        [HttpPut]
        public IEnumerable<Team.Member> AddMembers(TeamAddMember entity)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<Team.Member>("Team_AddMembers", entity, commandType: CommandType.StoredProcedure);
            }
        }

        [HttpDelete]
        public int DeleteMember(string id, string employeeId)
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Execute("Team_DeleteMember",
                                             new { Id = id, EmployeeId = employeeId },
                                             commandType: CommandType.StoredProcedure);
            }
        }

        public string Put(Team entity)
        {
            using (var db = new DapperDatabase())
            {
                entity.Id = Guid.NewGuid().ToString().Substring(0, 30);

                db.Connection.Execute("Team_Add", entity, commandType: CommandType.StoredProcedure);

                db.Connection.LogActivity(ActivityActions.Create, teamId: entity.Id);

                return entity.Id;
            }
        }

        public int Post(Team entity)
        {
            using (var db = new DapperDatabase())
            {
                int id = db.Connection.Execute("Team_Update", entity, commandType: CommandType.StoredProcedure);

                db.Connection.LogActivity(ActivityActions.Update, teamId: entity.Id);

                return id;
            }
        }

        public void Delete(string id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Team_Delete", new { Id = id }, commandType: CommandType.StoredProcedure);

                db.Connection.LogActivity(ActivityActions.Delete, teamId: id);
            }
        }
    }
}

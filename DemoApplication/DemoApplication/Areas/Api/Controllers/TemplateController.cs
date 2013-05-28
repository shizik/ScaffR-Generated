namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public class TemplateController : ApiController
    {
        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Template_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        [HttpGet]
        public IEnumerable<TemplateBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TemplateBrief>("Template_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }

        public Template Get(int id)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.QueryMultiple("Template_GetById", new { Id = id }, commandType: CommandType.StoredProcedure);

                var template = result.Read<Template>().Single();
                template.Tasks = result.Read<Task>().ToList();

                return template;
            }
        }

        [HttpPost]
        public void AddTask(Task entity)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Template_AddTask", entity, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

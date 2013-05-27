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
        //
        // GET ~/api/Template

        public IEnumerable<dynamic> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query("Template_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        //
        // GET ~/api/Template/Brief

        [HttpGet]
        public IEnumerable<TemplateBrief> Brief()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<TemplateBrief>("Template_GetBrief", commandType: CommandType.StoredProcedure);
            }
        }
        
        //
        // GET ~/api/Template/1

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
    }
}

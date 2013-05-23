using DemoApplication.Areas.Api.Models;

namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Web.Http;
    using Breeze.WebApi;
    using Infrastructure.Http;
    using Metadata;
    using Newtonsoft.Json.Linq;

    public partial class NetchexApiController : ApiController
    {
        private readonly IWebApiDataContext _context;

        public NetchexApiController(IWebApiDataContext context)
        {
            _context = context;
        }

        //
        // GET ~/api/Metadata

        [HttpGet]
        public MetadataDefinition Metadata()
        {
            return MetadataRegistry.Generate();
        }

        //
        // GET ~/api/TeamBrief

        [HttpGet]
        public List<TeamBrief> TeamBrief()
        {
            return TeamBriefData.Get();
        }

        //
        // GET ~/api/TemplateBrief

        [HttpGet]
        public List<TemplateBrief> TemplateBrief()
        {
            return TemplateBriefData.Get();
        }

        //[HttpGet]
        //public Employee Get(string id)
        //{
        //    var employee = EmployeeData.GetById(id);
        //    //employee.Tasks = AssignmentData.GetForEmployee(id);

        //    return employee;
        //}

        //
        // POST ~/api/SaveChanges

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _context.SaveChanges(saveBundle);
        }
    }
}

using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Controllers
{
    using System.Web.Http;
    using Breeze.WebApi;
    using MockData;
    using Infrastructure.Http;
    using Newtonsoft.Json.Linq;

    public class NetchexApiController : ApiController
    {
        private readonly IWebApiDataContext _context;

        public NetchexApiController(IWebApiDataContext context)
        {
            _context = context;
        }


        //
        // GET ~/api/Metadata

        [HttpGet]
        public object Metadata()
        {
            return ModelRegistry.Generate();
        }

        //
        // GET ~/api/EmployeeBrief

        [HttpGet]
        public List<EmployeeBrief> EmployeeBrief()
        {
            return EmployeeBriefData.Get();
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

        //
        // POST ~/api/SaveChanges

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            return _context.SaveChanges(saveBundle);
        }
    }
}

namespace DemoApplication.Areas.Api.Controllers
{
    using System.Linq;
    using System.Web.Http;
    using Breeze.WebApi;
    using Core.Model;
    using Infrastructure.Http;
    using Newtonsoft.Json.Linq;

    [BreezeController]
    public partial class NetchexApiController : ApiController
    {
        private readonly IWebApiDataContext _context;

        public NetchexApiController(IWebApiDataContext context)
        {
            _context = context;
        }

        //
        // GET ~/api/Users

        [HttpGet]
        public IQueryable<User> Users()
        {
            return _context.Users;
        }

        //
        // GET ~/api/Metadata 

        [HttpGet]
        public string Metadata()
        {
            return _context.Metadata();
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

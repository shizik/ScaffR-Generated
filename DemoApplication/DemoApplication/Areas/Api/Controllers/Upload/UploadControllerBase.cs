namespace DemoApplication.Areas.Api.Controllers
{
    using System.Web;
    using System.Web.Http;
    using System.Configuration;
    using System.Web.Script.Serialization;

    public abstract partial class UploadControllerBase : ApiController
    {
        private readonly JavaScriptSerializer _js = new JavaScriptSerializer { MaxJsonLength = 41943040 };
        private readonly string _storageRoot = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["FileUploadPath"]);
    }
}

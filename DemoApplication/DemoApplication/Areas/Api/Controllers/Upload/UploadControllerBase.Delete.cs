namespace DemoApplication.Areas.Api.Controllers
{
    using System.Web;
    using System.IO;
    using System.Net;
    using System.Net.Http;

    public abstract partial class UploadControllerBase
    {
        public HttpResponseMessage Delete()
        {
            var filePath = _storageRoot + HttpContext.Current.Request["f"];
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return ControllerContext.Request.CreateResponse(HttpStatusCode.OK, "");
        }
    }
}

namespace DemoApplication.Areas.Api.Controllers
{
    using System.Web;
    using System.Net.Http;
    using System.Collections.Generic;
    using Models;

    public class AttachmentController : UploadControllerBase
    {
        public IEnumerable<FilesStatus> Get()
        {
            return Download();
        }

        public HttpResponseMessage Post()
        {
            return UploadFile(HttpContext.Current);
        }

        public HttpResponseMessage Put()
        {
            return UploadFile(HttpContext.Current);
        }
    }
}

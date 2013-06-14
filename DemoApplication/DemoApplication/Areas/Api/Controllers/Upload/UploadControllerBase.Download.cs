using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Controllers
{
    using System.Linq;
    using System.Web;
    using System.IO;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Models;

    public abstract partial class UploadControllerBase
    {
        //protected HttpResponseMessage Download()
        //{
        //    return !string.IsNullOrEmpty(HttpContext.Current.Request["f"]) ? DownloadFileContent() : DownloadFileList();
        //}

        private HttpResponseMessage DownloadFileContent()
        {
            var filename = HttpContext.Current.Request["f"];
            var filePath = _storageRoot + filename;
            if (File.Exists(filePath))
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StreamContent(new FileStream(filePath, FileMode.Open, FileAccess.Read));
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = filename
                };
                return response;
            }
            return ControllerContext.Request.CreateErrorResponse(HttpStatusCode.NotFound, "");
        }

        protected IEnumerable<FilesStatus> Download()//DownloadFileList()
        {
            return
            new DirectoryInfo(_storageRoot)
                .GetFiles("*", SearchOption.TopDirectoryOnly)
                .Where(f => !f.Attributes.HasFlag(FileAttributes.Hidden))
                .Select(f => new FilesStatus(f))
                .ToArray();

            //HttpContext.Current.Response.ContentType = "application/json";
            //HttpContext.Current.Response.AppendHeader("Content-Disposition", "inline; filename=\"files.json\"");
            //return ControllerContext.Request.CreateResponse(HttpStatusCode.OK, _js.Serialize(files));
        }
    }
}

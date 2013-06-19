using System.Collections.Generic;
using System.Data;
using System.Web.Mvc;
using DemoApplication.Infrastructure.Data;

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
        public HttpResponseMessage Get(int id)
        {
            dynamic result;
            using (var db = new DapperDatabase())
            {
                result = db.Connection.Query("File_GetById",
                                             new { Id = id },
                                             commandType: CommandType.StoredProcedure)
                                      .SingleOrDefault();
            }

            if (result == null) return Request.CreateErrorResponse(HttpStatusCode.NotFound, "");

            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(result.Content);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(result.MimeType);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
            {
                FileName = result.Name
            };

            return response;
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

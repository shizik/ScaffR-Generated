namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Infrastructure.Data;
    using Models;

    public class AttachmentController : UploadControllerBase
    {
        public IEnumerable<File> Get()
        {
            using (var db = new DapperDatabase())
            {
                return db.Connection.Query<File>("Attachment_GetAll", commandType: CommandType.StoredProcedure);
            }
        }

        public HttpResponseMessage Get(int id)
        {
            dynamic result;
            using (var db = new DapperDatabase())
            {
                result = db.Connection.Query("Attachment_GetById",
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

        public dynamic Post()
        {
            return new
            {
                Files = UploadFile()
            };
        }

        public dynamic Put()
        {
            return new
            {
                Files = UploadFile()
            };
        }

        public HttpResponseMessage Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Attachment_Delete",
                                      new { Id = id },
                                      commandType: CommandType.StoredProcedure);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "");
        }

    }
}

namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using System.Net.Http;
    using System.Web;
    using Infrastructure.Data;
    using Models;

    public class AttachmentController : UploadControllerBase
    {
        public IEnumerable<FilesStatus> Get()
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.Query("File_GetAll", commandType: CommandType.StoredProcedure);

                return result.Select(x => new FilesStatus
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Type = x.MimeType,
                        Size = (int)x.Size
                    });
            }
        }

        public dynamic Post()
        {
            var statuses = new List<FilesStatus>();
            var files = HttpContext.Current.Request.Files;

            for (int i = 0; i < files.Count; i++)
            {
                var file = files[i];
                var fileRequest = new
                    {
                        Name = file.FileName,
                        MimeType = file.ContentType,
                        Content = GetByteFromFile(file)
                    };

                int id;
                using (var db = new DapperDatabase())
                {
                    id = (int)db.Connection.Query<decimal>("File_Add", fileRequest, commandType: CommandType.StoredProcedure).First();
                }

                statuses.Add(new FilesStatus
                {
                    Id = id,
                    Name = fileRequest.Name,
                    Type = fileRequest.MimeType,
                    Size = fileRequest.Content.Length
                });
            }

            return new
            {
                files = statuses
            };
        }

        public HttpResponseMessage Put()
        {
            return UploadFile(HttpContext.Current);
        }
    }
}

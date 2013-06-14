using System;
using System.Data;
using System.IO;
using System.Linq;
using DemoApplication.Infrastructure.Data;

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
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.Query<File>("File_GetAll", commandType: CommandType.StoredProcedure);

                return result.Select(x => new FilesStatus(x.Name, x.Size, null));
            }
        }

        public HttpResponseMessage Post()
        {
            var statuses = new List<FilesStatus>();

            for (int i = 0; i < HttpContext.Current.Request.Files.Count; i++)
            {
                var file = HttpContext.Current.Request.Files[i];

                using (var db = new DapperDatabase())
                {
                    db.Connection.Execute("File_Add", new
                        {
                            Name = file.FileName,
                            MimeType = file.ContentType,
                            Content = GetByteFromFile(file)
                        },
                        commandType: CommandType.StoredProcedure);
                }

                statuses.Add(new FilesStatus(file.FileName, file.ContentLength, null));
            }
            return WriteJsonIframeSafe(HttpContext.Current, statuses);
        }

        public HttpResponseMessage Put()
        {
            return UploadFile(HttpContext.Current);
        }
    }
}

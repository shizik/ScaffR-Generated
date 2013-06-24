namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Web;
    using Infrastructure.Data;
    using Models;

    public partial class AttachmentController
    {
        public dynamic Post()
        {
            return UploadFile();
        }

        public dynamic Put()
        {
            return UploadFile();
        }

        private static dynamic UploadFile()
        {
            var context = HttpContext.Current;
            var statuses = new List<FilesStatus>();

            if (string.IsNullOrEmpty(context.Request.Headers["X-File-Name"]))
            {
                UploadWholeFile(context, statuses);
            }
            else
            {
                UploadPartialFile(context.Request.Headers["X-File-Name"], context, statuses);
            }

            return new
            {
                files = statuses
            };
        }

        private static void UploadPartialFile(string fileName, HttpContext context, List<FilesStatus> statuses)
        {
            // TODO: Need to figure out how to implement this with SQL database

            throw new NotImplementedException("Partial FileUpload is not implemented.");
            /*
            if (context.Request.Files.Count != 1) throw new HttpRequestValidationException("Attempt to upload chunked file containing more than one fragment per request");
            var inputStream = context.Request.Files[0].InputStream;
            var fullName = _storageRoot + Path.GetFileName(fileName);

            using (var fs = new FileStream(fullName, FileMode.Append, FileAccess.Write))
            {
                var buffer = new byte[1024];

                var l = inputStream.Read(buffer, 0, 1024);
                while (l > 0)
                {
                    fs.Write(buffer, 0, l);
                    l = inputStream.Read(buffer, 0, 1024);
                }
                fs.Flush();
                fs.Close();
            }
            statuses.Add(new FilesStatus(new FileInfo(fullName)));
            */
        }

        private static void UploadWholeFile(HttpContext context, List<FilesStatus> statuses)
        {
            var files = context.Request.Files;

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
                    id = (int)db.Connection.Query<decimal>("Attachment_Add", fileRequest, commandType: CommandType.StoredProcedure).First();
                }

                statuses.Add(new FilesStatus
                {
                    Id = id,
                    Name = fileRequest.Name,
                    Type = fileRequest.MimeType,
                    Size = fileRequest.Content.Length
                });
            }
        }

        private static byte[] GetByteFromFile(HttpPostedFile file)
        {
            using (var binaryReader = new BinaryReader(file.InputStream))
            {
                return binaryReader.ReadBytes(file.ContentLength);
            }
        }
    }
}
namespace DemoApplication.Areas.Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Common;
    using System.Linq;
    using System.Web;
    using System.Web.Http;
    using Infrastructure.Data;
    using Models;

    public abstract class UploadControllerBase : ApiController
    {
        protected static List<File> UploadFile(DbConnection connection = null, DbTransaction transaction = null)
        {
            var context = HttpContext.Current;
            var statuses = new List<File>();

            if (string.IsNullOrEmpty(context.Request.Headers["X-File-Name"]))
            {
                UploadWholeFile(context, statuses, connection, transaction);
            }
            else
            {
                UploadPartialFile(context.Request.Headers["X-File-Name"], context, statuses);
            }

            return statuses;
        }

        private static void UploadPartialFile(string fileName, HttpContext context, List<File> statuses)
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

        private static void UploadWholeFile(HttpContext context, List<File> statuses, DbConnection connection, DbTransaction transaction)
        {
            var conn = connection ?? (new DapperDatabase()).Connection;
            var tran = connection == null ? conn.BeginTransaction() : transaction;
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

                int id = (int)conn.Query<decimal>("Attachment_Add", fileRequest,
                                                  commandType: CommandType.StoredProcedure,
                                                  transaction: tran).Single();

                statuses.Add(new File
                {
                    Id = id,
                    Name = fileRequest.Name,
                    Type = fileRequest.MimeType,
                    Size = fileRequest.Content.Length
                });
            }

            if (connection != null) return;

            // If there was no passed connection we need to dispose of the local instances
            tran.Commit();
            tran.Dispose();
            conn.Close();
        }

        private static byte[] GetByteFromFile(HttpPostedFile file)
        {
            using (var binaryReader = new System.IO.BinaryReader(file.InputStream))
            {
                return binaryReader.ReadBytes(file.ContentLength);
            }
        }
    }
}
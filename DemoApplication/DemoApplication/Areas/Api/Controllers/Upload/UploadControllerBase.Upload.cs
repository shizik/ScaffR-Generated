namespace DemoApplication.Areas.Api.Controllers
{
    using System.Collections.Generic;
    using System.Web;
    using System.IO;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using Models;

    public abstract partial class UploadControllerBase
    {
        protected HttpResponseMessage UploadFile(HttpContext context)
        {
            var statuses = new List<FilesStatus>();
            var headers = context.Request.Headers;

            if (string.IsNullOrEmpty(headers["X-File-Name"]))
            {
                UploadWholeFile(context, statuses);
            }
            else
            {
                UploadPartialFile(headers["X-File-Name"], context, statuses);
            }

            return WriteJsonIframeSafe(context, statuses);
        }

        protected HttpResponseMessage WriteJsonIframeSafe(HttpContext context, List<FilesStatus> statuses)
        {
            context.Response.AddHeader("Vary", "Accept");
            var result = new
            {
                files = statuses.ToArray()
            };

            var response = new HttpResponseMessage()
                {
                    Content = new StringContent(_js.Serialize(result))
                };

            if (context.Request["HTTP_ACCEPT"].Contains("application/json"))
            {
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            }
            else
            {
                response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/plain");
            }

            return response;
        }

        // Upload partial file
        private void UploadPartialFile(string fileName, HttpContext context, List<FilesStatus> statuses)
        {
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
        }

        // Upload entire file
        private void UploadWholeFile(HttpContext context, List<FilesStatus> statuses)
        {
            for (int i = 0; i < context.Request.Files.Count; i++)
            {
                var file = context.Request.Files[i];
                string fullPath = _storageRoot + Path.GetFileName(file.FileName);
                Directory.CreateDirectory(_storageRoot);
                file.SaveAs(fullPath);
                
                string fullName = Path.GetFileName(file.FileName);
                statuses.Add(new FilesStatus(fullName, file.ContentLength, fullPath));
            }
        }

        protected byte[] GetByteFromFile(HttpPostedFile file)
        {
            using (var binaryReader = new BinaryReader(file.InputStream))
            {
                return binaryReader.ReadBytes(file.ContentLength);
            }
        }
    }
}

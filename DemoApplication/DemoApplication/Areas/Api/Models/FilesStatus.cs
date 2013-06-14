namespace DemoApplication.Areas.Api.Models
{
    using System;
    using System.Drawing;
    using System.IO;

    public class FilesStatus
    {
        private const string HandlerPath = "/";

        public string group { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public int size { get; set; }
        public string progress { get; set; }
        public string url { get; set; }
        public string thumbnail_url { get; set; }
        public string delete_url { get; set; }
        public string delete_type { get; set; }
        public string error { get; set; }

        public FilesStatus()
        {
        }

        public FilesStatus(FileInfo fileInfo)
        {
            SetValues(fileInfo.Name, (int)fileInfo.Length, fileInfo.FullName);
        }

        public FilesStatus(string fileName, int fileLength, string fullPath)
        {
            SetValues(fileName, fileLength, fullPath);
        }

        private void SetValues(string fileName, int fileLength, string fullPath)
        {
            name = fileName;
            type = "image/png";
            size = fileLength;
            progress = "1.0";
            url = HandlerPath + "api/Upload?f=" + fileName;
            delete_url = HandlerPath + "api/Upload?f=" + fileName;
            delete_type = "DELETE";
            var ext = Path.GetExtension(fullPath);
            var fileSize = ConvertBytesToMegabytes(new FileInfo(fullPath).Length);
            if (fileSize > 3 || !IsImage(ext))
            {
                thumbnail_url = "/Content/img/generalFile.png";
            }
            else
            {
                thumbnail_url = @"data:image/png;base64," + EncodeFile(fullPath);
            }
        }

        private static bool IsImage(string ext)
        {
            return ext == ".gif" || ext == ".jpg" || ext == ".png";
        }

        private static string EncodeFile(string fileName)
        {
            byte[] bytes;
            using (var image = Image.FromFile(fileName))
            {
                var ratioX = (double)80 / image.Width;
                var ratioY = (double)80 / image.Height;
                var ratio = Math.Min(ratioX, ratioY);
                var newWidth = (int)(image.Width * ratio);
                var newHeight = (int)(image.Height * ratio);
                var newImage = new Bitmap(newWidth, newHeight);
                Graphics.FromImage(newImage).DrawImage(image, 0, 0, newWidth, newHeight);
                var converter = new ImageConverter();
                bytes = (byte[])converter.ConvertTo(newImage, typeof(byte[]));
                newImage.Dispose();
            }
            return Convert.ToBase64String(bytes);
        }

        private static double ConvertBytesToMegabytes(long bytes)
        {
            return (bytes / 1024f) / 1024f;
        }
    }
}
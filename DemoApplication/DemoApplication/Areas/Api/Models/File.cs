namespace DemoApplication.Areas.Api.Models
{
    public class File
    {
        private const string Endpoint = "/api/Attachment?id=";

        public int Id { get; set; }
        public string Group { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Size { get; set; }
        public bool IsUpload { get; set; }

        public string Progress { get { return "1.0"; } }

        public string Url { get { return Endpoint + Id; } }
        public string DeleteUrl { get { return Endpoint + Id; } }
        public string DeleteType { get { return "DELETE"; } }
        public string ThumbnailUrl { get { return "/Content/img/generalFile.png"; } }

        public string Error { get; set; }
    }
}
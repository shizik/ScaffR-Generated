using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class Template
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Task> Tasks { get; set; }
    }
}

using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class Employee
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }

        public List<int> AppliedTemplates { get; set; }
    }
}

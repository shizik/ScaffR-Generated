using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoApplication.Areas.Api.MockData
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsDone { get; set; }

        public int EmployeeId { get; set; }
        public int AssigneeId { get; set; }
        public int CategoryId { get; set; }
        public int TemplateId { get; set; }

        public Employee Employee { get; set; }
    }
}
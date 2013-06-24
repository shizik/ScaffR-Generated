using System;

namespace DemoApplication.Areas.Api.Models
{
    public class AssignmentSave : Task
    {
        public DateTime DueDate { get; set; }
        public string EmployeeId { get; set; }
    }
}
using System;

namespace DemoApplication.Areas.Api.Models
{
    public class AssignmentSave : Assignment
    {
        public DateTime DueDate { get; set; }
        public string EmployeeId { get; set; }
    }
}
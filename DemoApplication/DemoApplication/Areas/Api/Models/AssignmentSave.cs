using System;

namespace DemoApplication.Areas.Api.Models
{
    public class AssignmentSave
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public string EmployeeId { get; set; }
        public string PrincipalType { get; set; }
        public string PrincipalId { get; set; }
        public int CategoryId { get; set; }
        public bool Reocurring { get; set; }
    }
}
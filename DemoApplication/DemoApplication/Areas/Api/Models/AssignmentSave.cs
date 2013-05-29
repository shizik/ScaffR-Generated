using System;

namespace DemoApplication.Areas.Api.Models
{
    public class AssignmentSave
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ParentTaskId { get; set; }
        public int MilestoneId { get; set; }
        public int MilestoneValue { get; set; }
        public int Interval { get; set; }
        public int IsBefore { get; set; }
        public int TemplateId { get; set; }
        public int CategoryId { get; set; }
        public DateTime DueDate { get; set; }
        public bool ResolvedByOne { get; set; }
        public string PrincipalId { get; set; }
        public string EmployeeId { get; set; }
    }
}
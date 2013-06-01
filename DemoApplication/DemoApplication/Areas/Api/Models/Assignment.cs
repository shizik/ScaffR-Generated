using System;

namespace DemoApplication.Areas.Api.Models
{
    public class Assignment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int Status { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletedDate { get; set; }

        public bool PrincipalIsTeam { get; set; }
        public bool ResolvedByOne { get; set; }
        public string PrincipalId { get; set; }
        public string ApproverId { get; set; }
        public string EmployeeId { get; set; }

        public bool RequiresSignature { get; set; }
        public bool Recurring { get; set; }

        public int TaskId { get; set; }
        public int CategoryId { get; set; }
    }
}
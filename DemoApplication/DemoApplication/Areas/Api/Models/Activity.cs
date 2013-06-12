using System;
namespace DemoApplication.Areas.Api.Models
{
    public class Activity
    {
        public DateTime DateTime { get; set; }
        public string Action { get; set; }
    }

    public class ActivitySave
    {
        public string Action { get; set; }
        public string UserId { get; set; }

        public int? AssignmentId { get; set; }
        public int? TaskId { get; set; }
        public int? TemplateId { get; set; }
        public string TeamId { get; set; }

        //public string EmployeeId { get; set; }
        //public string PrincipalId { get; set; }

        //public string DepartmentId { get; set; }
        //public string PositionId { get; set; }
    }

    public class ActivityActions
    {
        public const string Create = "Created";
        public const string Update = "Updated";
        public const string Delete = "Deleted";
        public const string View = "Viewed";
        public const string Complete = "Completed";
        public const string ApplyToDepartment = "Applied To Department";
        public const string ApplyToPosition = "Applied To Position";
        public const string ApplyToEmployee = "Applied To Employee";
    }
}
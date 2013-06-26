using System;

namespace DemoApplication.Areas.Api.Models
{
    public class Assignment : TaskBase
    {
        public int Status { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletedDate { get; set; }

        public string EmployeeId { get; set; }

        public int TaskId { get; set; }

        public static Assignment FromAssignmentSave(AssignmentSave entity)
        {
            var task = new Assignment
            {
                DueDate = entity.DueDate,
                EmployeeId = entity.EmployeeId,
            };

            task.FillBaseProperties(entity);
            if (task.PrincipalId == null)
                task.PrincipalId = task.EmployeeId;

            return task;
        }
    }
}
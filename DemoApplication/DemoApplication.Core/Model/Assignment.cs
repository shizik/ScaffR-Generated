using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoApplication.Core.Model
{
    public class Assignment : TaskInfo
    {
        public DateTime? CompletionDate { get; set; }

        public string CompletedBy { get; set; }

        public DateTime? DueDate { get; set; }

        [NotMapped]
        public bool IsOverdue
        {
            get
            {
                if (!DueDate.HasValue) return false;

                return DueDate.Value < DateTime.Now;
            }
        }

        public IAssignable Assignee { get; set; }

        public Employee Employee { get; set; }
    }
}

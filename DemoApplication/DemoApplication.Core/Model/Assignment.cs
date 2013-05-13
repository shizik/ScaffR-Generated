using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DemoApplication.Core.Model
{
    public class Assignment : TaskInfo
    {
        public string EmployeeCode
        {
            get;
            set;
        }


        public string CompletedBy { get; set; }

        public DateTime? DueDate { get; set; }

        public int Status { get; set; }

        public DateTime? CompletionDate
        {
            get
            {
                if (Status != 0 && DueDate != null && DueDate.Value != null) return DueDate.Value;

                return null;
            }
        }

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

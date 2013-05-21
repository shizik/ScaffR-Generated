using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Assignment
    {
        public Assignment()
        {
            this.Assignment_Attachment = new List<Assignment_Attachment>();
            this.Assignment_History = new List<Assignment_History>();
        }

        public int AssignmentId { get; set; }
        public string Name { get; set; }
        public string Employee_Cd { get; set; }
        public Nullable<int> TaskId { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> DueDate { get; set; }
        public string Principal_Type { get; set; }
        public string Principal_Cd { get; set; }
        public byte Status { get; set; }
        public int Order { get; set; }
        public bool Reocurring { get; set; }
        public Nullable<byte> AssignmentMode { get; set; }
        public virtual ICollection<Assignment_Attachment> Assignment_Attachment { get; set; }
        public virtual ICollection<Assignment_History> Assignment_History { get; set; }
        public virtual Person_Main Person_Main { get; set; }
        public virtual Principal Principal { get; set; }
        public virtual Task Task { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Task
    {
        public Task()
        {
            this.Assignments = new List<Assignment>();
            this.Task_Attachment = new List<Task_Attachment>();
            this.Task1 = new List<Task>();
            this.Task_Template = new List<Task_Template>();
        }

        public int TaskId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ListId { get; set; }
        public int ParentTaskId { get; set; }
        public Nullable<int> MilestoneId { get; set; }
        public Nullable<int> MilestoneValue { get; set; }
        public Nullable<int> TemplateId { get; set; }
        public bool Recurring { get; set; }
        public string ReminderInfo { get; set; }
        public Nullable<byte> AssignmentMode { get; set; }
        public string Category { get; set; }
        public virtual ICollection<Assignment> Assignments { get; set; }
        public virtual Milestone Milestone { get; set; }
        public virtual ICollection<Task_Attachment> Task_Attachment { get; set; }
        public virtual ICollection<Task> Task1 { get; set; }
        public virtual Task Task2 { get; set; }
        public virtual ICollection<Task_Template> Task_Template { get; set; }
    }
}

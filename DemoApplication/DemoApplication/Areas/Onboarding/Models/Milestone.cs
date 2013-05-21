using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Milestone
    {
        public Milestone()
        {
            this.Tasks = new List<Task>();
        }

        public int MilestoneId { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}

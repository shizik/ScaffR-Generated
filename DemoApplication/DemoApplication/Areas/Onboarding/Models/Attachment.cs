using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Attachment
    {
        public Attachment()
        {
            this.Assignment_Attachment = new List<Assignment_Attachment>();
            this.Task_Attachment = new List<Task_Attachment>();
        }

        public int AttachmentId { get; set; }
        public string Name { get; set; }
        public string MineType { get; set; }
        public virtual ICollection<Assignment_Attachment> Assignment_Attachment { get; set; }
        public virtual ICollection<Task_Attachment> Task_Attachment { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Assignment_Attachment
    {
        public int AssignmentId { get; set; }
        public int AttachmentId { get; set; }
        public string Name { get; set; }
        public virtual Assignment Assignment { get; set; }
        public virtual Attachment Attachment { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Task_Attachment
    {
        public int AttachmentId { get; set; }
        public int TaskId { get; set; }
        public string Name { get; set; }
        public virtual Attachment Attachment { get; set; }
        public virtual Task Task { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Task_Template
    {
        public int TaskId { get; set; }
        public int TemplateId { get; set; }
        public string Principal_Cd { get; set; }
        public virtual Task Task { get; set; }
        public virtual Template Template { get; set; }
    }
}

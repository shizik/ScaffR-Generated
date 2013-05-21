using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Department_Template
    {
        public int TemplateId { get; set; }
        public string Company_Cd { get; set; }
        public string Division_Cd { get; set; }
        public string MajorFunction_Cd { get; set; }
        public string Department_Cd { get; set; }
        public virtual Template Template { get; set; }
    }
}

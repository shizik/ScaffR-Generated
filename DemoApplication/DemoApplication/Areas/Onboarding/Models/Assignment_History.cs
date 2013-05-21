using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Assignment_History
    {
        public int HistoryId { get; set; }
        public int AssignmentId { get; set; }
        public string Body { get; set; }
        public System.DateTime Created { get; set; }
        public virtual Assignment Assignment { get; set; }
    }
}

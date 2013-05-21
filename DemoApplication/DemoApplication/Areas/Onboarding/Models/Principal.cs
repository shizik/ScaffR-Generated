using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Principal
    {
        public Principal()
        {
            this.Assignments = new List<Assignment>();
        }

        public string Company_Cd { get; set; }
        public string Principal_Cd { get; set; }
        public byte Type { get; set; }
        public virtual ICollection<Assignment> Assignments { get; set; }
    }
}

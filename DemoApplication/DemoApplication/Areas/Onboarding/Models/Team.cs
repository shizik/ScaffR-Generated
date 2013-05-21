using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Team
    {
        public Team()
        {
            this.Person_Main = new List<Person_Main>();
            this.Person_Main1 = new List<Person_Main>();
        }

        public string Team_Cd { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Person_Main> Person_Main { get; set; }
        public virtual ICollection<Person_Main> Person_Main1 { get; set; }
    }
}

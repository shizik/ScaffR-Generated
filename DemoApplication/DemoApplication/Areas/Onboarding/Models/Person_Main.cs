using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Person_Main
    {
        public Person_Main()
        {
            this.Assignments = new List<Assignment>();
            this.Person_Comment = new List<Person_Comment>();
            this.Person_List = new List<Person_List>();
            this.Teams = new List<Team>();
            this.Templates = new List<Template>();
            this.Teams1 = new List<Team>();
        }

        public string Employee_Cd { get; set; }
        public string Company_Cd { get; set; }
        public string Division_Cd { get; set; }
        public string Department_Cd { get; set; }
        public string First_Name_Txt { get; set; }
        public string Last_Name_Txt { get; set; }
        public virtual ICollection<Assignment> Assignments { get; set; }
        public virtual ICollection<Person_Comment> Person_Comment { get; set; }
        public virtual Person_Hire Person_Hire { get; set; }
        public virtual ICollection<Person_List> Person_List { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<Template> Templates { get; set; }
        public virtual ICollection<Team> Teams1 { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Template
    {
        public Template()
        {
            this.Department_Template = new List<Department_Template>();
            this.Task_Template = new List<Task_Template>();
            this.Person_Main = new List<Person_Main>();
        }

        public int TemplateId { get; set; }
        public string Company_Cd { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public virtual ICollection<Department_Template> Department_Template { get; set; }
        public virtual ICollection<Task_Template> Task_Template { get; set; }
        public virtual ICollection<Person_Main> Person_Main { get; set; }
    }
}

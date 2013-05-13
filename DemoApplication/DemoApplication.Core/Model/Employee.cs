using System.Collections.Generic;

namespace DemoApplication.Core.Model
{
    public class Employee : DomainObject
    {
        public string EmployeeCode
        {
            get;
            set;
        }
        public string Company { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Title { get; set; }

        public string Name
        {
            get { return FirstName + " " + LastName; }
        }

        public string DepartmentName { get; set; }
        //public virtual Department Department { get; set; }

        /// <summary>
        /// Assignments about this user
        /// </summary>
        public virtual IEnumerable<Assignment> AssignmentsAbout { get; set; }

        //public virtual User User { get; set; }
    }
}

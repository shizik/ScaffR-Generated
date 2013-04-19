using System.Collections.Generic;

namespace DemoApplication.Core.Model
{
    public class Employee : User, IAssignable
    {
        public string Title { get; set; }

        public string Name
        {
            get { return FullName; }
        }

        public virtual Department Department { get; set; }

        /// <summary>
        /// Assignments about this user
        /// </summary>
        public virtual ICollection<Assignment> AssignmentsAbout { get; set; }
    }
}

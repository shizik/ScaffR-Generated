using System.Collections.Generic;

namespace DemoApplication.Core.Model
{
    public class Employee : DomainObject, IAssignable
    {
            

        public string Title { get; set; }

        public string Name
        {
            get { return User.FullName; }
        }

        public virtual Department Department { get; set; }

        /// <summary>
        /// Assignments about this user
        /// </summary>
        public virtual ICollection<Assignment> AssignmentsAbout { get; set; }

        public virtual User User { get; set; }
    }
}

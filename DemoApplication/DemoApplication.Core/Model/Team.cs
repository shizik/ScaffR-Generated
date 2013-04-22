using System.Collections;
using System.Collections.Generic;

namespace DemoApplication.Core.Model
{
    public class Team : DomainObject, IAssignable
    {
        public string Name { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}

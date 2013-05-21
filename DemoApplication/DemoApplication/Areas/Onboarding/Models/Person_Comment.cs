using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Person_Comment
    {
        public int CommentId { get; set; }
        public string Employee_Cd { get; set; }
        public string Company_Cd { get; set; }
        public string Body { get; set; }
        public System.DateTime Created { get; set; }
        public bool Deleted { get; set; }
        public string Author_Cd { get; set; }
        public virtual Person_Main Person_Main { get; set; }
    }
}

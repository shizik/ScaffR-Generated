using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Person_List
    {
        public int ListId { get; set; }
        public string Employee_Cd { get; set; }
        public string Company_Cd { get; set; }
        public string Name { get; set; }
        public virtual Person_Main Person_Main { get; set; }
    }
}

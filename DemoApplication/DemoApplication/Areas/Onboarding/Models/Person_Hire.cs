using System;
using System.Collections.Generic;

namespace MvcApplication2.Models
{
    public partial class Person_Hire
    {
        public string Employee_Cd { get; set; }
        public Nullable<System.DateTime> OriginalHire_Dt { get; set; }
        public Nullable<System.DateTime> SecondaryHire_Dt { get; set; }
        public Nullable<System.DateTime> Termination_Dt { get; set; }
        public string Termination_Type_Cd { get; set; }
        public string Termination_Type_Txt { get; set; }
        public Nullable<bool> Active_Ind { get; set; }
        public Nullable<bool> Rehire_Ind { get; set; }
        public Nullable<bool> Removed_Ind { get; set; }
        public virtual Person_Main Person_Main { get; set; }
    }
}

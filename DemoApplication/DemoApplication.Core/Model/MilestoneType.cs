using System.ComponentModel;

namespace DemoApplication.Core.Model
{
    public enum MilestoneType
    {
        [Description("Hire Date")]
        HireDate,

        [Description("Termination Date")]
        TerminationDate,
    }
}

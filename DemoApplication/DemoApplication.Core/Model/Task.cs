using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class Task : TaskInfo
    {
        public int MilestoneDays { get; set; }

        public MilestoneType Milestone { get; set; }

        public IAssignable Assignee { get; set; }
    }
}

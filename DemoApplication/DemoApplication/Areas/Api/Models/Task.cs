namespace DemoApplication.Areas.Api.Models
{
    public class Task : TaskBase
    {
        public int MilestoneId { get; set; }
        public int MilestoneValue { get; set; }
        public int Interval { get; set; }
        public bool IsBefore { get; set; }

        public int? ParentTaskId { get; set; }
        public int? TemplateId { get; set; }

        public static Task FromAssignmentSave(AssignmentSave entity)
        {
            var task = new Task
                {
                    MilestoneId = entity.MilestoneId,
                    MilestoneValue = entity.MilestoneValue,
                    Interval = entity.Interval,
                    IsBefore = entity.IsBefore,

                    ParentTaskId = entity.ParentTaskId,
                    TemplateId = entity.TemplateId,
                };

            task.FillBaseProperties(entity);

            return task;
        }
    }
}
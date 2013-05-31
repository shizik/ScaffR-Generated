namespace DemoApplication.Areas.Api.Models
{
    public class TaskBrief
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int TasksCount { get; set; }
    }
}
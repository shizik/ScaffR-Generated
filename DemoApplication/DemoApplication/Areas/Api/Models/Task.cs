using System;

namespace DemoApplication.Areas.Api.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int Interval { get; set; }
        public bool IsBefore { get; set; }
        public int MilestoneId { get; set; }
        public int MilestoneValue { get; set; }

        public int CategoryId { get; set; }
    }
}
using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class TeamBrief
    {
        public string Id { get; set; }
        public string DepartmentId { get; set; }
        public string Name { get; set; }
        public int EmployeesCount { get; set; }
        public DateTime DateInitiated { get; set; }
        public DateTime DateLastAction { get; set; }
        public DateTime LatestDueDate { get; set; }

        //
        // Task Related

        public int Open { get; set; }
        public int Overdue { get; set; }
        public int Closed { get; set; }
        public int Performance { get; set; }

    }
}
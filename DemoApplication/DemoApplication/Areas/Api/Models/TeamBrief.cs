using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class TeamBrief
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
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

    public class TeamBriefData
    {
        public static List<TeamBrief> Get()
        {
            return new List<TeamBrief>
            {
                new TeamBrief
                    {
                        Id = 1,
                        DepartmentId = 1,
                        Name = "Sales Systems",
                        EmployeesCount = 8,
                        DateInitiated  = new DateTime(2013,4,15),
                        DateLastAction  = new DateTime(2013,4,17),
                        LatestDueDate  = new DateTime(2013,7,15),
                        Open  = 15,
                        Overdue  = 0,
                        Closed  = 2,
                        Performance = 95
                    },
                new TeamBrief
                    {
                        Id = 2,
                        DepartmentId = 3,
                        Name = "Marketing Department",
                        EmployeesCount = 20,
                        DateInitiated  = new DateTime(2013,4,5),
                        DateLastAction  = new DateTime(2013,4,13),
                        LatestDueDate  = new DateTime(2013,6,25),
                        Open  = 1,
                        Overdue  = 0,
                        Closed  = 20,
                        Performance = 85
                    },
                new TeamBrief
                    {
                        Id = 3,
                        DepartmentId = 4,
                        Name = "Human Resources",
                        EmployeesCount = 15,
                        DateInitiated  = new DateTime(2013,4,1),
                        DateLastAction  = new DateTime(2013,4,10),
                        LatestDueDate  = new DateTime(2013,6,15),
                        Open  = 2,
                        Overdue  = 0,
                        Closed  = 19,
                        Performance = 90
                    },
                new TeamBrief
                    {
                        Id = 4,
                        DepartmentId = 2,
                        Name = "IT Approval",
                        EmployeesCount = 23,
                        DateInitiated  = new DateTime(2013,4,23),
                        DateLastAction  = new DateTime(2013,4,28),
                        LatestDueDate  = new DateTime(2013,5,5),
                        Open  = 1,
                        Overdue  = 10,
                        Closed  = 1,
                        Performance = 70
                    },
                new TeamBrief
                    {
                        Id = 5,
                        DepartmentId = 1,
                        Name = "Sales Welcome",
                        EmployeesCount = 6,
                        DateInitiated  = new DateTime(2013,4,6),
                        DateLastAction  = new DateTime(2013,4,8),
                        LatestDueDate  = new DateTime(2013,5,1),
                        Open  = 1,
                        Overdue  = 1,
                        Closed  = 28,
                        Performance = 30
                    },
            };
        }
    }
}
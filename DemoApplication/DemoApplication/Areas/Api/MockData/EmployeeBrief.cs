using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.MockData
{
    public class EmployeeBrief
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Manager { get; set; }
        public DateTime DateInitiated { get; set; }
        public DateTime DateLastAction { get; set; }
        public DateTime LatestDueDate { get; set; }

        //
        // Task Related

        public int Open { get; set; }
        public int Overdue { get; set; }
        public int Closed { get; set; }
    }

    public class EmployeeBriefData
    {
        public static List<EmployeeBrief> Get()
        {
            return new List<EmployeeBrief>
                {
                 new EmployeeBrief
                    {
                        Id = 1,
                        DepartmentId = 1,
                        FirstName = "John",
                        LastName = "Smith",
                        Manager = "Chris Sheller",
                        DateInitiated  = new DateTime(2013,4,15),
                        DateLastAction  = new DateTime(2013,4,17),
                        LatestDueDate  = new DateTime(2013,7,15),
                        Open  = 15,
                        Overdue  = 0,
                        Closed  = 2
                    },
                new EmployeeBrief
                    {
                        Id = 2,
                        DepartmentId = 3,
                        FirstName = "John",
                        LastName = "Hancock",
                        Manager = "Chris Sheller",
                        DateInitiated  = new DateTime(2013,4,5),
                        DateLastAction  = new DateTime(2013,4,13),
                        LatestDueDate  = new DateTime(2013,6,25),
                        Open  = 1,
                        Overdue  = 0,
                        Closed  = 20
                    },
                new EmployeeBrief
                    {
                        Id = 3,
                        DepartmentId = 4,
                        FirstName = "Thomas",
                        LastName = "Jeferson",
                        Manager = "Chris Sheller",
                        DateInitiated  = new DateTime(2013,4,1),
                        DateLastAction  = new DateTime(2013,4,10),
                        LatestDueDate  = new DateTime(2013,6,15),
                        Open  = 2,
                        Overdue  = 0,
                        Closed  = 19
                    },
                new EmployeeBrief
                    {
                        Id = 4,
                        DepartmentId = 2,
                        FirstName = "Olivia",
                        LastName = "Cleaver",
                        Manager = "George Lucas",
                        DateInitiated  = new DateTime(2013,4,23),
                        DateLastAction  = new DateTime(2013,4,28),
                        LatestDueDate  = new DateTime(2013,5,5),
                        Open  = 1,
                        Overdue  = 10,
                        Closed  = 1
                    },
                new EmployeeBrief
                    {
                        Id = 5,
                        DepartmentId = 1,
                        FirstName = "George",
                        LastName = "Washington",
                        Manager = "Chris Sheller",
                        DateInitiated  = new DateTime(2013,4,6),
                        DateLastAction  = new DateTime(2013,4,8),
                        LatestDueDate  = new DateTime(2013,5,1),
                        Open  = 1,
                        Overdue  = 1,
                        Closed  = 28
                    },
                new EmployeeBrief
                    {
                        Id = 6,
                        DepartmentId = 2,
                        FirstName = "Alexander",
                        LastName = "Hamilton",
                        Manager = "George Lucas",
                        DateInitiated  = new DateTime(2013,4,20),
                        DateLastAction  = new DateTime(2013,4,26),
                        LatestDueDate  = new DateTime(2013,5,13),
                        Open  = 6,
                        Overdue  = 10,
                        Closed  = 1
                    },
                new EmployeeBrief
                    {
                        Id = 7,
                        DepartmentId = 1,
                        FirstName = "Chuck",
                        LastName = "Norris",
                        Manager = "Chris Sheller",
                        DateInitiated  = new DateTime(2013,4,6),
                        DateLastAction  = new DateTime(2013,4,15),
                        LatestDueDate  = new DateTime(2013,5,3),
                        Open  = 2,
                        Overdue  = 10,
                        Closed  = 28
                    },
                new EmployeeBrief
                    {
                        Id = 8,
                        DepartmentId = 2,
                        FirstName = "Vergie",
                        LastName = "Shrock",
                        Manager = "Cosmo Cramer",
                        DateInitiated  = new DateTime(2013,4,1),
                        DateLastAction  = new DateTime(2013,4,12),
                        LatestDueDate  = new DateTime(2013,4,29),
                        Open  = 0,
                        Overdue  = 15,
                        Closed  = 5
                    },
                };
        }
    }
}
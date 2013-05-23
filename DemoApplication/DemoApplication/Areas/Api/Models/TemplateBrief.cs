using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class TemplateBrief
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int DepartmentId { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public int TasksCount { get; set; }
        //TODO: Apply Values ?!?
        public string CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }

    public class TemplateBriefData
    {
        public static List<TemplateBrief> Get()
        {
            return new List<TemplateBrief>
            {
                new TemplateBrief
                    {
                        Id = 1,
                        Name = "Sales Associate",
                        DepartmentId=1,
                        Department ="Sales",
                        Description = "Assigned to every sales associate in Westpark",
                        TasksCount  = 8,
                        CreatedBy  = "Chris Sheller",
                        DateCreated  = new DateTime(2013,4,10),
                        DateModified  = new DateTime(2013,4,21)
                    },
                new TemplateBrief
                    {
                        Id = 2,
                        Name = "IT Director",
                        DepartmentId=2,
                        Department ="IT",
                        Description = "Assigned to every IT Director in Minneapolis",
                        TasksCount  = 3,
                        CreatedBy  = "Chris Sheller",
                        DateCreated  = new DateTime(2013,3,15),
                        DateModified  = new DateTime(2013,4,1)
                    },
                new TemplateBrief
                    {
                        Id = 3,
                        Name = "VP of Marketing",
                        DepartmentId=3,
                        Department ="Marketing",
                        Description = "Assigned to every marketing employee",
                        TasksCount  = 4,
                        CreatedBy  = "Chris Sheller",
                        DateCreated  = new DateTime(2013,3,21),
                        DateModified  = new DateTime(2013,5,10)
                    },
                new TemplateBrief
                    {
                        Id = 4,
                        Name = "CFO Phoenix",
                        DepartmentId=4,
                        Department ="Finance",
                        Description = "Assigned to Chief Director level financial employee",
                        TasksCount  = 7,
                        CreatedBy  = "Christine Alexander",
                        DateCreated  = new DateTime(2013,4,3),
                        DateModified  = new DateTime(2013,4,10)
                    },
                new TemplateBrief
                    {
                        Id = 5,
                        Name = "Sales Representative",
                        DepartmentId=1,
                        Department ="Sales",
                        Description = "Assigned to every Sales Representative",
                        TasksCount  = 11,
                        CreatedBy  = "George Lucas",
                        DateCreated  = new DateTime(2013,4,15),
                        DateModified  = new DateTime(2013,4,16)
                    },
            };
        }
    }
}
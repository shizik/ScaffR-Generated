using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class Approver
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }

        public List<Approver.Assignment> Tasks { get; set; }

        public class Assignment
        {
            public int Id { get; set; }
            public int Status { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public string EmployeeId { get; set; }
            public string EmployeeName { get; set; }
            public DateTime DueDate { get; set; }
            public int CategoryId { get; set; }
        }
    }
}

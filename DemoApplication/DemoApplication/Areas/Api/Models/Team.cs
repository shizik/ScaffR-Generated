using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class Team
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<Member> Members { get; set; }
        public List<Assignment> Tasks { get; set; }

        public class Member
        {
            public string Id { get; set; }
            public string Name { get; set; }
            public bool IsActive { get; set; }
        }

        public class Assignment
        {
            public int Id { get; set; }
            public int Status { get; set; }
            public string Name { get; set; }
            public string PrincipalId { get; set; }
            public string PrincipalName { get; set; }
            public DateTime DueDate { get; set; }
        }
    }
}

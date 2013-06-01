﻿using System;

namespace DemoApplication.Areas.Api.Models
{
    public class EmployeeBrief
    {
        public string Id { get; set; }
        public string DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Manager { get; set; }
        public DateTime? DateInitiated { get; set; }
        public DateTime? DateLastAction { get; set; }
        public DateTime? LatestDueDate { get; set; }

        //
        // Task Related

        public int Open { get; set; }
        public int Overdue { get; set; }
        public int Pending { get; set; }
        public int Closed { get; set; }
    }
}
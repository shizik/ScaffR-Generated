﻿using System.Collections.Generic;
namespace DemoApplication.Areas.Api.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public int MilestoneId { get; set; }
        public int MilestoneValue { get; set; }
        public int Interval { get; set; }
        public bool IsBefore { get; set; }

        public bool PrincipalIsTeam { get; set; }
        public bool ResolvedByOne { get; set; }
        public string PrincipalId { get; set; }
        public string ApproverId { get; set; }

        public bool RequiresSignature { get; set; }
        public bool Recurring { get; set; }

        public int? ParentTaskId { get; set; }
        public int? TemplateId { get; set; }
        public int CategoryId { get; set; }

        public string Files { get; set; }  
    }
}
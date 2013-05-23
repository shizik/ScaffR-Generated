using System;
using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Models
{
    public class TemplateBrief
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DepartmentId { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public int TasksCount { get; set; }
        //TODO: Apply Values ?!?
        public string CreatedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
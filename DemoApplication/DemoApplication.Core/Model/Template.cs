using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class Template : DomainObject
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        [Required]
        [StringLength(100)]
        public string Description { get; set; }

        [Required]
        [StringLength(50)]
        public string CreatedBy { get; set; }

        public virtual ICollection<Task> Tasks { get; set; }

        public virtual ICollection<Department> Departments { get; set; }
    }
}

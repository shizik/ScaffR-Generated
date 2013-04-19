using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public abstract class TaskInfo : DomainObject
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        public TaskCategory TaskCategory { get; set; }
    }
}

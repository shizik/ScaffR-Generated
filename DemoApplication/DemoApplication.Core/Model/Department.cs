using System.ComponentModel.DataAnnotations;

namespace DemoApplication.Core.Model
{
    public class Department : DomainObject
    {
        [Required]
        [StringLength(30)]
        public string Name { get; set; }


    }
}

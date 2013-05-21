using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class DepartmentMap : EntityTypeConfiguration<Department>
    {
        public DepartmentMap()
        {
            // Primary Key
            this.HasKey(t => new { t.Company_Cd, t.Division_Cd, t.MajorFunction_Cd, t.Department_Cd });

            // Properties
            this.Property(t => t.Company_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Division_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.MajorFunction_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(5);

            this.Property(t => t.Department_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(5);

            this.Property(t => t.Department_Desc)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(40);

            // Table & Column Mappings
            this.ToTable("Department");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Division_Cd).HasColumnName("Division_Cd");
            this.Property(t => t.MajorFunction_Cd).HasColumnName("MajorFunction_Cd");
            this.Property(t => t.Department_Cd).HasColumnName("Department_Cd");
            this.Property(t => t.Department_Desc).HasColumnName("Department_Desc");
        }
    }
}

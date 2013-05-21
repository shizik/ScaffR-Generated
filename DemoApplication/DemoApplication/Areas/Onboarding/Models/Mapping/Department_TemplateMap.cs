using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Department_TemplateMap : EntityTypeConfiguration<Department_Template>
    {
        public Department_TemplateMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TemplateId, t.Company_Cd, t.Division_Cd, t.MajorFunction_Cd, t.Department_Cd });

            // Properties
            this.Property(t => t.TemplateId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

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

            // Table & Column Mappings
            this.ToTable("Department_Template");
            this.Property(t => t.TemplateId).HasColumnName("TemplateId");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Division_Cd).HasColumnName("Division_Cd");
            this.Property(t => t.MajorFunction_Cd).HasColumnName("MajorFunction_Cd");
            this.Property(t => t.Department_Cd).HasColumnName("Department_Cd");

            // Relationships
            this.HasRequired(t => t.Template)
                .WithMany(t => t.Department_Template)
                .HasForeignKey(d => d.TemplateId);

        }
    }
}

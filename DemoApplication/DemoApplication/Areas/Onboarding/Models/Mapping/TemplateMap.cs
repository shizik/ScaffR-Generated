using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class TemplateMap : EntityTypeConfiguration<Template>
    {
        public TemplateMap()
        {
            // Primary Key
            this.HasKey(t => t.TemplateId);

            // Properties
            this.Property(t => t.Company_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Category)
                .IsRequired()
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("Template");
            this.Property(t => t.TemplateId).HasColumnName("TemplateId");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Category).HasColumnName("Category");
        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class MilestoneMap : EntityTypeConfiguration<Milestone>
    {
        public MilestoneMap()
        {
            // Primary Key
            this.HasKey(t => t.MilestoneId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Milestone");
            this.Property(t => t.MilestoneId).HasColumnName("MilestoneId");
            this.Property(t => t.Name).HasColumnName("Name");
        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Assignment_HistoryMap : EntityTypeConfiguration<Assignment_History>
    {
        public Assignment_HistoryMap()
        {
            // Primary Key
            this.HasKey(t => t.HistoryId);

            // Properties
            this.Property(t => t.Body)
                .IsRequired()
                .HasMaxLength(500);

            // Table & Column Mappings
            this.ToTable("Assignment_History");
            this.Property(t => t.HistoryId).HasColumnName("HistoryId");
            this.Property(t => t.AssignmentId).HasColumnName("AssignmentId");
            this.Property(t => t.Body).HasColumnName("Body");
            this.Property(t => t.Created).HasColumnName("Created");

            // Relationships
            this.HasRequired(t => t.Assignment)
                .WithMany(t => t.Assignment_History)
                .HasForeignKey(d => d.AssignmentId);

        }
    }
}

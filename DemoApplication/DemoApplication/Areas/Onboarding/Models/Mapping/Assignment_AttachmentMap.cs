using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Assignment_AttachmentMap : EntityTypeConfiguration<Assignment_Attachment>
    {
        public Assignment_AttachmentMap()
        {
            // Primary Key
            this.HasKey(t => new { t.AssignmentId, t.AttachmentId });

            // Properties
            this.Property(t => t.AssignmentId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.AttachmentId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Assignment_Attachment");
            this.Property(t => t.AssignmentId).HasColumnName("AssignmentId");
            this.Property(t => t.AttachmentId).HasColumnName("AttachmentId");
            this.Property(t => t.Name).HasColumnName("Name");

            // Relationships
            this.HasRequired(t => t.Assignment)
                .WithMany(t => t.Assignment_Attachment)
                .HasForeignKey(d => d.AssignmentId);
            this.HasRequired(t => t.Attachment)
                .WithMany(t => t.Assignment_Attachment)
                .HasForeignKey(d => d.AttachmentId);

        }
    }
}

using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Task_AttachmentMap : EntityTypeConfiguration<Task_Attachment>
    {
        public Task_AttachmentMap()
        {
            // Primary Key
            this.HasKey(t => new { t.AttachmentId, t.TaskId });

            // Properties
            this.Property(t => t.AttachmentId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TaskId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Task_Attachment");
            this.Property(t => t.AttachmentId).HasColumnName("AttachmentId");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
            this.Property(t => t.Name).HasColumnName("Name");

            // Relationships
            this.HasRequired(t => t.Attachment)
                .WithMany(t => t.Task_Attachment)
                .HasForeignKey(d => d.AttachmentId);
            this.HasRequired(t => t.Task)
                .WithMany(t => t.Task_Attachment)
                .HasForeignKey(d => d.TaskId);

        }
    }
}

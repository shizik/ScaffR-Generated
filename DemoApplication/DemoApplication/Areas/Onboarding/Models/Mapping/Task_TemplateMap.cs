using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Task_TemplateMap : EntityTypeConfiguration<Task_Template>
    {
        public Task_TemplateMap()
        {
            // Primary Key
            this.HasKey(t => new { t.TaskId, t.TemplateId });

            // Properties
            this.Property(t => t.TaskId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.TemplateId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Principal_Cd)
                .IsFixedLength()
                .HasMaxLength(10);

            // Table & Column Mappings
            this.ToTable("Task_Template");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
            this.Property(t => t.TemplateId).HasColumnName("TemplateId");
            this.Property(t => t.Principal_Cd).HasColumnName("Principal_Cd");

            // Relationships
            this.HasRequired(t => t.Task)
                .WithMany(t => t.Task_Template)
                .HasForeignKey(d => d.TaskId);
            this.HasRequired(t => t.Template)
                .WithMany(t => t.Task_Template)
                .HasForeignKey(d => d.TemplateId);

        }
    }
}

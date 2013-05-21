using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class TaskMap : EntityTypeConfiguration<Task>
    {
        public TaskMap()
        {
            // Primary Key
            this.HasKey(t => t.TaskId);

            // Properties
            this.Property(t => t.TaskId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(500);

            this.Property(t => t.ReminderInfo)
                .HasMaxLength(50);

            this.Property(t => t.Category)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Task");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.ListId).HasColumnName("ListId");
            this.Property(t => t.ParentTaskId).HasColumnName("ParentTaskId");
            this.Property(t => t.MilestoneId).HasColumnName("MilestoneId");
            this.Property(t => t.MilestoneValue).HasColumnName("MilestoneValue");
            this.Property(t => t.TemplateId).HasColumnName("TemplateId");
            this.Property(t => t.Recurring).HasColumnName("Recurring");
            this.Property(t => t.ReminderInfo).HasColumnName("ReminderInfo");
            this.Property(t => t.AssignmentMode).HasColumnName("AssignmentMode");
            this.Property(t => t.Category).HasColumnName("Category");

            // Relationships
            this.HasOptional(t => t.Milestone)
                .WithMany(t => t.Tasks)
                .HasForeignKey(d => d.MilestoneId);
            this.HasRequired(t => t.Task2)
                .WithMany(t => t.Task1)
                .HasForeignKey(d => d.ParentTaskId);

        }
    }
}

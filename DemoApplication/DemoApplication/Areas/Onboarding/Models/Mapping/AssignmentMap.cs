using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class AssignmentMap : EntityTypeConfiguration<Assignment>
    {
        public AssignmentMap()
        {
            // Primary Key
            this.HasKey(t => t.AssignmentId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Employee_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Description)
                .HasMaxLength(500);

            this.Property(t => t.Principal_Type)
                .IsFixedLength()
                .HasMaxLength(10);

            this.Property(t => t.Principal_Cd)
                .IsFixedLength()
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("Assignment");
            this.Property(t => t.AssignmentId).HasColumnName("AssignmentId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Employee_Cd).HasColumnName("Employee_Cd");
            this.Property(t => t.TaskId).HasColumnName("TaskId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.DueDate).HasColumnName("DueDate");
            this.Property(t => t.Principal_Type).HasColumnName("Principal_Type");
            this.Property(t => t.Principal_Cd).HasColumnName("Principal_Cd");
            this.Property(t => t.Status).HasColumnName("Status");
            this.Property(t => t.Order).HasColumnName("Order");
            this.Property(t => t.Reocurring).HasColumnName("Reocurring");
            this.Property(t => t.AssignmentMode).HasColumnName("AssignmentMode");

            // Relationships
            this.HasRequired(t => t.Person_Main)
                .WithMany(t => t.Assignments)
                .HasForeignKey(d => d.Employee_Cd);
            this.HasOptional(t => t.Principal)
                .WithMany(t => t.Assignments)
                .HasForeignKey(d => d.Principal_Cd);
            this.HasOptional(t => t.Task)
                .WithMany(t => t.Assignments)
                .HasForeignKey(d => d.TaskId);

        }
    }
}

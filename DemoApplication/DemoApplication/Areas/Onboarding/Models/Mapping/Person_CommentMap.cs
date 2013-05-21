using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Person_CommentMap : EntityTypeConfiguration<Person_Comment>
    {
        public Person_CommentMap()
        {
            // Primary Key
            this.HasKey(t => t.CommentId);

            // Properties
            this.Property(t => t.Employee_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Company_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Body)
                .IsRequired()
                .HasMaxLength(500);

            this.Property(t => t.Author_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("Person_Comment");
            this.Property(t => t.CommentId).HasColumnName("CommentId");
            this.Property(t => t.Employee_Cd).HasColumnName("Employee_Cd");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Body).HasColumnName("Body");
            this.Property(t => t.Created).HasColumnName("Created");
            this.Property(t => t.Deleted).HasColumnName("Deleted");
            this.Property(t => t.Author_Cd).HasColumnName("Author_Cd");

            // Relationships
            this.HasRequired(t => t.Person_Main)
                .WithMany(t => t.Person_Comment)
                .HasForeignKey(d => d.Employee_Cd);

        }
    }
}

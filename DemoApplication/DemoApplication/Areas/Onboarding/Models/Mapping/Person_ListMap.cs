using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Person_ListMap : EntityTypeConfiguration<Person_List>
    {
        public Person_ListMap()
        {
            // Primary Key
            this.HasKey(t => t.ListId);

            // Properties
            this.Property(t => t.Employee_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Company_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Person_List");
            this.Property(t => t.ListId).HasColumnName("ListId");
            this.Property(t => t.Employee_Cd).HasColumnName("Employee_Cd");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Name).HasColumnName("Name");

            // Relationships
            this.HasRequired(t => t.Person_Main)
                .WithMany(t => t.Person_List)
                .HasForeignKey(d => d.Employee_Cd);

        }
    }
}

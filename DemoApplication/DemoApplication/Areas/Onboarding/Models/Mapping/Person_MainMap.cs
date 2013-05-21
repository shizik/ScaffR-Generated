using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Person_MainMap : EntityTypeConfiguration<Person_Main>
    {
        public Person_MainMap()
        {
            // Primary Key
            this.HasKey(t => t.Employee_Cd);

            // Properties
            this.Property(t => t.Employee_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Company_Cd)
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Division_Cd)
                .IsFixedLength()
                .HasMaxLength(3);

            this.Property(t => t.Department_Cd)
                .IsFixedLength()
                .HasMaxLength(5);

            this.Property(t => t.First_Name_Txt)
                .IsFixedLength()
                .HasMaxLength(10);

            this.Property(t => t.Last_Name_Txt)
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Person_Main");
            this.Property(t => t.Employee_Cd).HasColumnName("Employee_Cd");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Division_Cd).HasColumnName("Division_Cd");
            this.Property(t => t.Department_Cd).HasColumnName("Department_Cd");
            this.Property(t => t.First_Name_Txt).HasColumnName("First_Name_Txt");
            this.Property(t => t.Last_Name_Txt).HasColumnName("Last_Name_Txt");

            // Relationships
            this.HasMany(t => t.Teams)
                .WithMany(t => t.Person_Main)
                .Map(m =>
                    {
                        m.ToTable("Person_Team");
                        m.MapLeftKey("Employee_Cd");
                        m.MapRightKey("Team_Cd");
                    });

            this.HasMany(t => t.Templates)
                .WithMany(t => t.Person_Main)
                .Map(m =>
                    {
                        m.ToTable("Person_Template");
                        m.MapLeftKey("Employee_Cd");
                        m.MapRightKey("TemplateId");
                    });

            this.HasMany(t => t.Teams1)
                .WithMany(t => t.Person_Main1)
                .Map(m =>
                    {
                        m.ToTable("Team_Employee");
                        m.MapLeftKey("Employee_Cd");
                        m.MapRightKey("Team_Cd");
                    });


        }
    }
}

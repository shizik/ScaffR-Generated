using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class Person_HireMap : EntityTypeConfiguration<Person_Hire>
    {
        public Person_HireMap()
        {
            // Primary Key
            this.HasKey(t => t.Employee_Cd);

            // Properties
            this.Property(t => t.Employee_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Termination_Type_Cd)
                .IsFixedLength()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Person_Hire");
            this.Property(t => t.Employee_Cd).HasColumnName("Employee_Cd");
            this.Property(t => t.OriginalHire_Dt).HasColumnName("OriginalHire_Dt");
            this.Property(t => t.SecondaryHire_Dt).HasColumnName("SecondaryHire_Dt");
            this.Property(t => t.Termination_Dt).HasColumnName("Termination_Dt");
            this.Property(t => t.Termination_Type_Cd).HasColumnName("Termination_Type_Cd");
            this.Property(t => t.Termination_Type_Txt).HasColumnName("Termination_Type_Txt");
            this.Property(t => t.Active_Ind).HasColumnName("Active_Ind");
            this.Property(t => t.Rehire_Ind).HasColumnName("Rehire_Ind");
            this.Property(t => t.Removed_Ind).HasColumnName("Removed_Ind");

            // Relationships
            this.HasRequired(t => t.Person_Main)
                .WithOptional(t => t.Person_Hire);

        }
    }
}

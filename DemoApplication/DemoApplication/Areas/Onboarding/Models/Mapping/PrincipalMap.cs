using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class PrincipalMap : EntityTypeConfiguration<Principal>
    {
        public PrincipalMap()
        {
            // Primary Key
            this.HasKey(t => t.Principal_Cd);

            // Properties
            this.Property(t => t.Company_Cd)
                .IsFixedLength()
                .HasMaxLength(10);

            this.Property(t => t.Principal_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            // Table & Column Mappings
            this.ToTable("Principal");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
            this.Property(t => t.Principal_Cd).HasColumnName("Principal_Cd");
            this.Property(t => t.Type).HasColumnName("Type");
        }
    }
}

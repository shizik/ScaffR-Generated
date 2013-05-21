using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class TeamMap : EntityTypeConfiguration<Team>
    {
        public TeamMap()
        {
            // Primary Key
            this.HasKey(t => t.Team_Cd);

            // Properties
            this.Property(t => t.Team_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(30);

            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Team");
            this.Property(t => t.Team_Cd).HasColumnName("Team_Cd");
            this.Property(t => t.Name).HasColumnName("Name");
        }
    }
}

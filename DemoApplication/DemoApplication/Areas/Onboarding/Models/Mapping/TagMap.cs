using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class TagMap : EntityTypeConfiguration<Tag>
    {
        public TagMap()
        {
            // Primary Key
            this.HasKey(t => t.TagId);

            // Properties
            this.Property(t => t.TagId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Company_Cd)
                .IsRequired()
                .IsFixedLength()
                .HasMaxLength(3);

            // Table & Column Mappings
            this.ToTable("Tags");
            this.Property(t => t.TagId).HasColumnName("TagId");
            this.Property(t => t.Company_Cd).HasColumnName("Company_Cd");
        }
    }
}

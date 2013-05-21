using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace MvcApplication2.Models.Mapping
{
    public class AttachmentMap : EntityTypeConfiguration<Attachment>
    {
        public AttachmentMap()
        {
            // Primary Key
            this.HasKey(t => t.AttachmentId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.MineType)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Attachment");
            this.Property(t => t.AttachmentId).HasColumnName("AttachmentId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.MineType).HasColumnName("MineType");
        }
    }
}

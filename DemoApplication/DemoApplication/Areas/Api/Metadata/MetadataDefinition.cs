using System.Collections.Generic;

namespace DemoApplication.Areas.Api.Metadata
{
    public class MetadataDefinition
    {
        public string MetadataVersion { get; set; }
        public List<StructuralType> StructuralTypes { get; set; }
    }
}
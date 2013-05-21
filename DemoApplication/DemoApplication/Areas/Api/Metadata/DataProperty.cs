namespace DemoApplication.Areas.Api.Metadata
{
    public class DataProperty
    {
        public string Name { get; set; }
        public string DataType { get; set; }
        public bool IsNullable { get; set; }
        public bool IsPartOfKey { get; set; }
    }
}
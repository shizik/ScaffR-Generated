namespace DemoApplication.Metadata.Attributes
{
    using System.ComponentModel.DataAnnotations;
    using System.Web.Mvc;
    using Extensions;

    public class TextboxAttribute : DataTypeAttribute, IMetadataAware
    {
        readonly BootstrapInputOptions options = new BootstrapInputOptions();

        public BootstrapInputOptions Options { get { return options; } }

        public TextboxAttribute()
            : this("String")
        {

        }

        public TextboxAttribute(DataType dataType)
            : base(dataType)
        {

        }

        public TextboxAttribute(string dataType)
            : base(dataType)
        {

        }


        public bool IsMultiline
        {
            get { return options.Multiline; }
            set { options.Multiline = value; }
        }

        public TextboxSize TextboxSize
        {
            get { return options.Size; }
            set { options.Size = value; }
        }

        public string PlaceholderText
        {
            get { return options.Placeholder; }
            set { options.Placeholder = value; }
        }

        public string Mask
        {
            get { return options.Mask; }
            set { options.Mask = value; }
        }

        protected TextboxSize DefaultTextboxSize { get; set; }

        public virtual void OnMetadataCreated(ModelMetadata metadata)
        {
            if (options.Size == TextboxSize.None)
                options.Size = DefaultTextboxSize;
            metadata.AdditionalValues["InputOptions"] = this.Options;
        }
    }

    public enum FocusBehavior
    {
        Normal,
        ClearOnFocus
    }
}
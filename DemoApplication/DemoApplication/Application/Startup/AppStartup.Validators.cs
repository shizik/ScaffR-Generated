using DemoApplication.Application.Startup;

[assembly: WebActivator.PreApplicationStartMethod(typeof(AppStartup), "RegisterValidationExtensions")]
namespace DemoApplication.Application.Startup
{
    using System.Web.Mvc;
    using Metadata.Adapters;
    using Metadata.Attributes;

    public partial class AppStartup
    {
        public static void RegisterValidationExtensions()
        {
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(EmailTextboxAttribute), typeof(EmailAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(UrlTextboxAttribute), typeof(UrlAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(CreditCardTextboxAttribute), typeof(CreditCardAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(EqualToAttribute), typeof(EqualToAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(FileExtensionsAttribute), typeof(FileExtensionsAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(NumericTextboxAttribute), typeof(NumericAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(DigitsTextboxAttribute), typeof(DigitsAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(MinAttribute), typeof(MinAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(MaxAttribute), typeof(MaxAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(DateTextboxAttribute), typeof(DateAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(IntegerAttribute), typeof(IntegerAttributeAdapter));
            DataAnnotationsModelValidatorProvider.RegisterAdapter(typeof(YearTextboxAttribute), typeof(YearAttributeAdapter));
        }
    }
}
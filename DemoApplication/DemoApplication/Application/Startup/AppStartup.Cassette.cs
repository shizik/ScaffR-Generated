#region credits
// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Rod Johnson
// Created	: 03-09-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion

using System.Text.RegularExpressions;

namespace DemoApplication.Application.Startup
{
    #region

    using System.IO;
    using Cassette;
    using Cassette.Scripts;
    using Cassette.Stylesheets;

    #endregion

    /// <summary>
    /// Class AppStartup
    /// </summary>
    public partial class AppStartup : IConfiguration<BundleCollection>
    {
        /// <summary>
        /// Configures the specified configurable.
        /// </summary>
        /// <param name="configurable">The configurable.</param>
        public void Configure(BundleCollection configurable)
        {
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/global");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/lib", new FileSearch { Exclude = new Regex(".intellisense\\.js$") });
            configurable.AddPerIndividualFile<ScriptBundle>("scripts/custom", null, bundle => bundle.PageLocation = "custom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/controllers", null, bundle => bundle.PageLocation = "bottom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/services", null, bundle => bundle.PageLocation = "custom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/models", null, bundle => bundle.PageLocation = "custom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/directives", null, bundle => bundle.PageLocation = "custom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/filters", null, bundle => bundle.PageLocation = "custom");
            configurable.AddPerSubDirectory<ScriptBundle>("scripts/utils", null, bundle => bundle.PageLocation = "custom");

            configurable.Add<StylesheetBundle>("content/less/site.less");
            configurable.AddUrlWithAlias<ScriptBundle>("http://maps.google.com/maps/api/js?sensor=false&libraries=places", "googleMaps");
        }
    }
}
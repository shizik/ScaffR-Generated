#region credits
// ***********************************************************************
// Assembly	: DemoApplication
// Author	: Marko Ilievski
// Created	: 06-05-2013
// 
// Last Modified By : Marko Ilievski
// Last Modified On : 06-05-2013
// ***********************************************************************
#endregion

namespace DemoApplication.Extensions.WebApi
{
    #region

    using System;
    using System.Linq;
    using System.Net.Http.Formatting;
    using System.Web.Http.Controllers;
    using Newtonsoft.Json.Serialization;

    #endregion

    public class CamelCaseJsonAttribute : Attribute, IControllerConfiguration
    {
        public void Initialize(HttpControllerSettings config,
                               HttpControllerDescriptor controllerDescriptor)
        {
            var formatter = config.Formatters.OfType<JsonMediaTypeFormatter>().SingleOrDefault();

            if (formatter == null) return;

            config.Formatters.Remove(formatter);

            // We need to new this, so it doesn't overwrite global settings
            formatter = new JsonMediaTypeFormatter
                {
                    SerializerSettings = { ContractResolver = new CamelCasePropertyNamesContractResolver() }
                };

            config.Formatters.Insert(0, formatter);
        }
    }
}
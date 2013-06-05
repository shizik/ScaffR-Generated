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
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Formatting;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;
    using System.Web.Http.Routing;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    #endregion

    public class AreaSpecificCamelCaseJsonFormatter : JsonMediaTypeFormatter
    {
        private IHttpRouteData _route;

        private readonly string _area;

        public AreaSpecificCamelCaseJsonFormatter(string area)
        {
            _area = area;
        }

        public override MediaTypeFormatter GetPerRequestFormatterInstance(Type type, HttpRequestMessage request, MediaTypeHeaderValue mediaType)
        {
            _route = request.GetRouteData();
            return base.GetPerRequestFormatterInstance(type, request, mediaType);
        }

        public override Task WriteToStreamAsync(Type type, object value, System.IO.Stream writeStream, HttpContent content, TransportContext transportContext)
        {
            if (_route.Route.RouteTemplate.StartsWith(_area, StringComparison.InvariantCultureIgnoreCase))
            {
                // Set the SerializerSettings for the specific area
                this.SerializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
            }

            return base.WriteToStreamAsync(type, value, writeStream, content, transportContext);
        }
    }
}
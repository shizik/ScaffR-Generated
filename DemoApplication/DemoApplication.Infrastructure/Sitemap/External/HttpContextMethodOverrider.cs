﻿using System.Web;

namespace DemoApplication.Infrastructure.Sitemap.External
{
    public class HttpContextMethodOverrider : HttpContextWrapper
    {
        private readonly HttpContext httpContext;

        private readonly string httpMethod;

        /// <summary>
        /// Initializes a new instance of the <see cref="HttpContextMethodOverrider"/> class.
        /// </summary>
        /// <param name="httpContext">The object that this wrapper class provides access to.</param>
        /// <param name="httpMethod">
        /// The <see cref="HttpRequestBase.HttpMethod"/> override value or <c>null</c> if the value
        /// should not be overridden.
        /// </param>
        /// <exception cref="T:System.ArgumentNullException">
        /// 	<paramref name="httpContext"/> is null.
        /// </exception>
        public HttpContextMethodOverrider(HttpContext httpContext, string httpMethod)
            : base(httpContext)
        {
            this.httpContext = httpContext;
            this.httpMethod = httpMethod;
        }

        /// <summary>
        /// Gets the <see cref="T:System.Web.HttpRequestBase"/> object for the current HTTP request.
        /// </summary>
        /// <value></value>
        /// <returns>
        /// The current HTTP request.
        /// </returns>
        public override HttpRequestBase Request
        {
            get { return new HttpRequestMethodOverrider(this.httpContext.Request, httpMethod); }
        }
    }
}


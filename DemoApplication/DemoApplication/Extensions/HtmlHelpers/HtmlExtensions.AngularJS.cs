using System.Web.Routing;

namespace DemoApplication.Extensions.HtmlHelpers
{
    using System.Web.Mvc;

    public static partial class HtmlExtensions
    {
        public static DisposableHelper AngularScope(this HtmlHelper helper, string controllerName = "", string tagName = "div", object htmlAttributes = null)
        {
            if (string.IsNullOrEmpty(controllerName))
            {
                controllerName = helper.ViewContext.RequestContext.RouteData.Values["action"].ToString().ToLower();
            }

            var builder = new TagBuilder(tagName);
            builder.MergeAttribute("data-ng-controller", controllerName);

            if (htmlAttributes != null)
                builder.MergeAttributes(new RouteValueDictionary(htmlAttributes));

            helper.ViewContext.Writer.Write(builder.ToString(TagRenderMode.StartTag));

            return new DisposableHelper(helper, builder.TagName);
        }
    }
}
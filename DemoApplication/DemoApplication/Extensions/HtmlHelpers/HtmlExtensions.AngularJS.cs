namespace DemoApplication.Extensions.HtmlHelpers
{
    using System.Web.Mvc;

    public static partial class HtmlExtensions
    {
        public static DisposableHelper AngularScope(this HtmlHelper helper, string controllerName = "")
        {
            if (string.IsNullOrEmpty(controllerName))
            {
                controllerName = helper.ViewContext.RequestContext.RouteData.Values["action"].ToString().ToLower();
            }

            var builder = new TagBuilder("div");
            builder.MergeAttribute("data-ng-controller", controllerName);
            helper.ViewContext.Writer.Write(builder.ToString(TagRenderMode.StartTag));

            return new DisposableHelper(helper, builder.TagName);
        }
    }
}
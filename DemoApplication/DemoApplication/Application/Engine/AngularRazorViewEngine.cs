namespace DemoApplication.Application.Engine
{
    using System;
    using System.Web.Mvc;
    using Cassette.Views;

    public class AngularRazorViewEngine : RazorViewEngine
    {
        protected override IView CreateView(ControllerContext controllerContext, string viewPath, string masterPath)
        {
            var controller = controllerContext.RouteData.Values["controller"];
            var str = string.Format("scripts/controllers/{0}.js", controller.ToString().ToLower());

            try
            {
                Bundles.Reference(str);
            }
            catch (Exception)
            {

            }
            
            return base.CreateView(controllerContext, viewPath, masterPath);
        }
    }
}
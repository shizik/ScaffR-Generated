using System.Web.Mvc;

namespace DemoApplication.Areas.Onboarding
{
    public class OnboardingAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Onboarding";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Onboarding_default",
                "Onboarding/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}

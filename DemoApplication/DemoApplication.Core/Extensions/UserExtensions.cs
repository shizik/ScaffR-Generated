namespace DemoApplication.Core.Extensions
{
    using System.Linq;
    using System.Security.Claims;
    using Model;

    public static class UserExtensions
    {
        public static IQueryable<User> GetCurrent(this IQueryable<User> query)
        {
            return query.Where(x => x.Username == ClaimsPrincipal.Current.Identity.Name);
        }
    }
}

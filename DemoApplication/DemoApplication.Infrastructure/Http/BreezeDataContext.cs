namespace DemoApplication.Infrastructure.Http
{
    using Breeze.WebApi;
    using Data;
    using Core.Model;
    using Core.Extensions;
    using System.Linq;

    public interface IWebApiDataContext
    {
        SaveResult SaveChanges(Newtonsoft.Json.Linq.JObject saveBundle);

        string Metadata();

        IQueryable<User> Users { get; }
    }

    public class BreezeDataContext : EFContextProvider<DataContext>, IWebApiDataContext
    {
        protected override bool BeforeSaveEntity(EntityInfo entityInfo)
        {
            var entity = entityInfo.Entity as DomainObject;
            if (entity != null)
            {
                var container = entity.GetValidationContainer();
                return container.IsValid;
            }

            return base.BeforeSaveEntity(entityInfo);
        }

        public IQueryable<User> Users
        {
            get { return Context.Users; }
        }

        public User Self
        {
            get { return Context.Users.GetCurrent().SingleOrDefault(); }
        }
    }
}

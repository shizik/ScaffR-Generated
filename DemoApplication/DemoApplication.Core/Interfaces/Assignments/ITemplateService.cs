using DemoApplication.Core.Model;
namespace DemoApplication.Core.Interfaces.Assignments
{
    public interface ITemplateService
    {
        Template CreateFromExisting(User user);
    }
}

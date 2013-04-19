using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Assignments
{
    public interface IEmployeeService
    {
        Employee GetEmployee(int id);
        Employee GetEmployeesByCompany(int companyId);

    }
}

using DemoApplication.Core.Model;

namespace DemoApplication.Core.Interfaces.Assignments
{
    public interface IAssignmentService
    {
        Assignment CreateAssignment(Employee employee, IAssignable asignee, Task task);
    }
}

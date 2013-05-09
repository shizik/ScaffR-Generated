namespace DemoApplication.Infrastructure.Services
{
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;
    using Core.Model;
    using Data;

    public interface IOnboardingService
    {
        void ApplyTemplate(string employeeCd, int templateId);

        Assignment ApplyTask(string employeeCd, int taskId, string description, string name, int Order);

        Assignment GetAssignment(int assignmentId);
    }

    public class OnboardingService : IOnboardingService
    {
        public Attachment AddAttachment(string name, string mimeType, int assignmentId)
        {
            using (var db = new DapperDatabase())
            {
                var args = new DynamicParameters();
                args.Add("@AttachmentName", dbType: DbType.String, value: name);
                args.Add("@mineType", dbType: DbType.String, value: mimeType);
                args.Add("@AssignmentId", dbType: DbType.Int32, value: assignmentId);
                args.Add("@AttachmentId", dbType: DbType.Int32, direction: ParameterDirection.Output);

                db.Connection.Execute("[dbo].[Assignment_AddAttachment]", args, commandType: CommandType.StoredProcedure);

                var attachmentId = args.Get<int>("AttachmentId");

                return GetAttachment(attachmentId);
            }
        }

        public void ApplyTemplate(string employeeCode, int templateId)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.Execute("[dbo].[Employee_ApplyTemplate]", new { employeeCode, templateId },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public Template CreateTemplate(string EmployeeCode, string templateName, string templateCategory, string companyCd)
        {
            using (var db = new DapperDatabase())
            {
                var args = new DynamicParameters();
                args.Add("@EmployeeCode", dbType: DbType.StringFixedLength, size: 30, value: EmployeeCode);
                args.Add("@TemplateName", dbType: DbType.String, value: templateName);
                args.Add("@TemplateCategory", dbType: DbType.String, value: templateCategory);
                args.Add("@Company_Cd", dbType: DbType.StringFixedLength, size: 3, value: companyCd);
                args.Add("@TemplateId", dbType: DbType.Int32, direction: ParameterDirection.Output);

                db.Connection.Execute("[dbo].[Template_CreateFromEmployee]",
                    args,
                    commandType: CommandType.StoredProcedure);

                var templateId = args.Get<int>("@TemplateId");

                return GetTemplate(templateId);
            }
        }

        public Assignment ApplyTask(string EmployeeCode, int taskId, string description, string name, int Order)
        {
            using (var db = new DapperDatabase())
            {

                var args = new DynamicParameters();
                args.Add("@EmployeeCode", dbType: DbType.StringFixedLength, size: 30, value: EmployeeCode);
                args.Add("@TaskId", dbType: DbType.Int32, value: taskId);
                args.Add("@description", dbType: DbType.String, value: description);
                args.Add("@Name", dbType: DbType.String, value: name);
                args.Add("@AssignmentID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                db.Connection.Execute("[dbo].[Assignment_CreateFromTask]",
                  args,
                  commandType: CommandType.StoredProcedure);

                var assignmentId = args.Get<int>("@AssignmentID");


                return GetAssignment(assignmentId);
            }
        }

        public Template GetTemplate(int templateId)
        {
            using (var db = new DapperDatabase())
            {
                var template = db.Connection.Query<Template>("[dbo].[Template_GetById]", new { templateId },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return template;
            }
        }

        public Attachment GetAttachment(int attachmentId)
        {
            using (var db = new DapperDatabase())
            {
                var attachment = db.Connection.Query<Attachment>("[dbo].[Attachment_GetById]", new { attachmentId },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return attachment;
            }
        }

        public Assignment GetAssignment(int assignmentId)
        {
            using (var db = new DapperDatabase())
            {
                var assignment = db.Connection.Query<Assignment>("[dbo].[Assignment_GetById]", new { assignmentId },
                    commandType: CommandType.StoredProcedure).FirstOrDefault();

                return assignment;
            }
        }

        public IEnumerable<Employee> GetEmployeesWithAssignment(string companyCode)
        {
            using (var db = new DapperDatabase())
            {
                var Employees = db.Connection.QueryMultiple("[dbo].[Employee_Tasks]", new { Company_Cd = companyCode }, commandType: CommandType.StoredProcedure).
                    Map<Employee, Assignment, string>(
                                                    employee => employee.EmployeeCode,
                                                    assignment => assignment.EmployeeCode,
                                                    (employee, assignments) =>
                                                    { employee.AssignmentsAbout = assignments; }
                                                 ).ToList();
                return Employees;
            }
        }


        public void AddExectDueDateForAssignment(int AssignmentID, System.DateTime duedate)
        {
            using (var db = new DapperDatabase())
            {

                var args = new DynamicParameters();
                args.Add("@DueDate", dbType: DbType.DateTime, value: duedate);
                args.Add("@AssignmentId", dbType: DbType.Int32, value: AssignmentID);

                db.Connection.Execute("[dbo].[Assignment_AddDueDate_Exact]",
                    args,
                    commandType: CommandType.StoredProcedure);


            }



        }






    }
}

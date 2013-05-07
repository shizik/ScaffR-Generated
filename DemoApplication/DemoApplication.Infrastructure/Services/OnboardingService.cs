namespace DemoApplication.Infrastructure.Services
{
    using System.Data;
    using System.Linq;
    using Core.Model;
    using Data;

    public interface IOnboardingService
    {
        void ApplyTemplate(string employeeCd, int templateId);

        Assignment ApplyTask(string employeeCd, int taskId ,string description, string name, int Order);

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

        public void ApplyTemplate(string employeeCd, int templateId)
        {
            using (var db = new DapperDatabase())
            {
                var result = db.Connection.Execute("[dbo].[Employee_ApplyTemplate]", new { employeeCd, templateId },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public Template CreateTemplate(string employeeCd, string templateName, string templateCategory, string companyCd)
        {
            using (var db = new DapperDatabase())
            {
                var args = new DynamicParameters();
                args.Add("@Employee_Cd", dbType: DbType.StringFixedLength, size: 30, value: employeeCd);
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

        public Assignment ApplyTask(string employeeCd, int taskId, string description, string name, int Order)
        {
            using (var db = new DapperDatabase())
            {

                var args = new DynamicParameters();
                args.Add("@EmployeeCd", dbType: DbType.StringFixedLength, size: 30, value: employeeCd);
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
    }
}

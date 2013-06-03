namespace DemoApplication.Areas.Api.Helpers
{
    using Infrastructure.Data;
    using Models;
    using System.Data;
    using System.Data.Common;

    public static class ActivityLogger
    {
        public static void LogActivity(this DbConnection connection, string action, int? assignmentId = null)
        {
            // TODO: Get ID from the logged in user
            var activity = new ActivitySave
            {
                Action = ActivityActions.View,
                AssignmentId = assignmentId,
                UserId = "D1BKRHX3X5A3GJI3QARHFUKRC4VYTF"
            };

            try
            {
                connection.Execute("Activity_Log", activity, commandType: CommandType.StoredProcedure);
            }
            catch { }
        }
    }
}
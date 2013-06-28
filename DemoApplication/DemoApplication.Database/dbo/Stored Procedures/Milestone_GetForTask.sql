-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE Milestone_GetForTask
	@TaskId INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT Milestone.MilestoneId AS Id, Milestone.Name, Milestone.Recurring, Milestone.Interval, Milestone.Value 
	FROM dbo.Milestone INNER JOIN dbo.Task ON Milestone.MilestoneId = Task.MilestoneId
	WHERE TaskId = @TaskId

END
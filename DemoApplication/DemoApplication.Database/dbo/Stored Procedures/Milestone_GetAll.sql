-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE Milestone_GetAll 
AS
BEGIN
	SET NOCOUNT ON;

	SELECT MilestoneId AS Id, Name, Recurring, Interval, Value FROM dbo.Milestone ORDER BY Name
END
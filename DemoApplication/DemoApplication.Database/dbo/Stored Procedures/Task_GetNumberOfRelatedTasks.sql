-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_GetNumberOfRelatedTasks 
	@Id int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT COUNT(1) FROM Tasks WHERE ParentTaskId = @Id
END
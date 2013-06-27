-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns associated employee assignments
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetTasks] 
	@Id char(30) 	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * From Assignments
	WHERE EmployeeId = @Id
END
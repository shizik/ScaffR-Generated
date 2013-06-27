-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns assignments that should be done for other people by this employee
-- =============================================
CREATE PROCEDURE [dbo].[Approver_GetTasksForOther] 
	@Id char(30) 	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM ApproverAssignments
	WHERE EmployeeId <> @Id AND (
		  PrincipalId = @Id OR 
		  PrincipalId IN (SELECT Team_Cd FROM Person_Team WHERE Employee_Cd = @Id))
END
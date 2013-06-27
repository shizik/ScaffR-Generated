-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns single employee with associated assignments
-- =============================================
CREATE PROCEDURE [dbo].[Approver_GetById] 
	@Id char(30) 	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM Employees WHERE Id = @Id

	-- Getting all tasks for the approver
	SELECT * FROM ApproverAssignments
	WHERE PrincipalId = @Id OR 
		  PrincipalId IN (SELECT Team_Cd FROM Person_Team WHERE Employee_Cd = @Id)
END
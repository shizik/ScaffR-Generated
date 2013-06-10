-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns single employee with associated assignments
-- =============================================
CREATE PROCEDURE [dbo].[Approver_GetById] 
	@Id char(30) 	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT * FROM Employees WHERE Id=@Id

	-- Getting all tasks for the approver
	SELECT Assignment.AssignmentId AS Id,
		   CASE
				WHEN [Status] = 1 AND [PrincipalIsTeam] = 1 AND 
					 (SELECT 1 
					  FROM Assignment_TeamResolution AS AT 
					  WHERE AT.AssignmentId = Assignment.AssignmentId AND AT.Employee_Cd=@Id) = 1 THEN 2
		        ELSE Assignment.[Status]
		   END AS 'Status',
		   Assignment.Name AS Name,  
		   [Description],
		   P.Employee_Cd AS EmployeeId, 		   
		   P.Last_Name_Txt + ' ' + P.First_Name_Txt AS EmployeeName,
		   A.Last_Name_Txt + ' ' + A.First_Name_Txt AS ApproverName,
		   CategoryId,
		   Assignment.DueDate AS DueDate
	FROM Assignment INNER JOIN Person_Main as P ON Assignment.Employee_Cd = P.Employee_Cd
					INNER JOIN Person_Main as A ON Assignment.Approver_Cd = A.Employee_Cd
	WHERE Assignment.Principal_Cd = @Id OR 
		  Assignment.Principal_Cd IN (SELECT Team_Cd FROM Person_Team WHERE Employee_Cd = @Id)

END
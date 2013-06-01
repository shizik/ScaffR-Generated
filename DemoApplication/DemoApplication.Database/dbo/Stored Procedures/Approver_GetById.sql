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
		   Assignment.Status,
		   Assignment.Name AS Name,  
		   Description,
		   Person_Main.Employee_Cd AS EmployeeId, 		   
		   Last_Name_Txt + ' ' + First_Name_Txt AS EmployeeName, 
		   CategoryId,
		   Assignment.DueDate AS DueDate
	FROM Assignment INNER JOIN Person_Main ON Assignment.Employee_Cd = Person_Main.Employee_Cd
	WHERE Assignment.Principal_Cd = @Id OR 
		  Assignment.Principal_Cd IN (SELECT Team_Cd FROM Person_Team WHERE Employee_Cd = @Id)

END
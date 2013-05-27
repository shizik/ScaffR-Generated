-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetById 
	-- Add the parameters for the stored procedure here
	@Id char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --Get Team values
	SELECT * FROM Teams WHERE Id = @Id

	-- Get all team members
	SELECT e.Id, e.LastName + ' ' + e.FirstName AS Name, 1 AS IsActive 
	FROM Employees e inner join Person_Team p on e.Id = p.Employee_Cd
	WHERE p.Team_Cd = @Id

	-- Getting all tasks for the team
	SELECT Assignment.IsDone,
		   Assignment.Name AS Name,  
		   Person_Main.Employee_Cd AS PrincipalId, 		   
		   Last_Name_Txt + ' ' + First_Name_Txt AS PrincipalName, 
		   Assignment.DueDate AS DueDate
	FROM Assignment INNER JOIN Person_Main ON Assignment.Employee_Cd = Person_Main.Employee_Cd
	WHERE Assignment.Principal_Cd = @Id

END
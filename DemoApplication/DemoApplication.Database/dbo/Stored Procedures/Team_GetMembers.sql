-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetMembers 
	@Id CHAR(30)
AS
BEGIN
	SET NOCOUNT ON;

	-- Get all team members
	SELECT e.Id, e.LastName + ' ' + e.FirstName AS Name, p.IsActive 
	FROM Employees e inner join Person_Team p on e.Id = p.Employee_Cd
	WHERE p.Team_Cd = @Id

END
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetAvailableMembers 
	@Id CHAR(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --Get Team values
	SELECT * FROM Teams WHERE Id <> @Id

	SELECT * FROM Departments

	-- Get all team members
	SELECT p.Employee_Cd AS Id, p.Last_Name_Txt + ' ' + p.First_Name_Txt AS Name, p.Department_Cd AS DepartmentId
	FROM Person_Main p inner join Department d on p.Department_Cd = d.Department_Cd
END
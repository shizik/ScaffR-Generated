

-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns single employee with associated assignments
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetById] 
	@Id char(30) 	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT dbo.Person_Main.Employee_Cd AS Id, 
		   First_Name_Txt AS FirstName, 
		   Last_Name_Txt AS LastName
	FROM dbo.Person_Main 
	WHERE Employee_Cd=@Id

	SELECT  AssignmentId AS Id ,
	        Name ,
			DueDate ,
			CompletedDate ,
	        IsDone ,
	        Employee_Cd AS EmployeeId ,
	        --Principal_Type ,
	        Principal_Cd AS AssigneeId
	FROM dbo.Assignment
	WHERE Employee_Cd=@Id
END
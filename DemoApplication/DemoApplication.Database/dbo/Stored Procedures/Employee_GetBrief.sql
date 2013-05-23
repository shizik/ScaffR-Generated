
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Employee Dashboard Data
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetBrief] 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @Today datetime = GETDATE()


	SELECT dbo.Person_Main.Employee_Cd AS Id, 
		   Department_Cd AS DepartmentId, 
		   First_Name_Txt AS FirstName, 
		   Last_Name_Txt AS LastName, 
		  -- OriginalHire_Dt, 
		   (SELECT COUNT(1) FROM dbo.Assignment WHERE IsDone = 0 AND DueDate <= @Today AND Person_Main.Employee_Cd = Assignment.Employee_Cd) AS 'Open',
		   (SELECT COUNT(1) FROM dbo.Assignment WHERE IsDone = 0 AND DueDate > @Today AND Person_Main.Employee_Cd = Assignment.Employee_Cd) AS 'Overdue',
		   (SELECT COUNT(1) FROM dbo.Assignment WHERE IsDone = 1 AND Person_Main.Employee_Cd = Assignment.Employee_Cd) AS 'Closed',
		   (SELECT TOP 1 DueDate FROM dbo.Assignment WHERE Person_Main.Employee_Cd = Assignment.Employee_Cd ORDER BY DueDate DESC) AS 'LatestDueDate'
	FROM dbo.Person_Main 
	GROUP BY dbo.Person_Main.Employee_Cd, Department_Cd, First_Name_Txt, Last_Name_Txt--, OriginalHire_Dt
			
END
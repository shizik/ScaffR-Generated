-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns single employee with associated assignments
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetById] 
	@EmployeeId char(30) 	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT 
		*
	FROM Employees
	WHERE Id=@EmployeeId

	SELECT  * From Assignments
	WHERE EmployeeId = @EmployeeId
END
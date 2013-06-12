
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Employee Dashboard Data
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetActivity] 
	@Id char(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM EmployeeActivity 
	WHERE UserId = @Id
	ORDER BY [DateTime]

END
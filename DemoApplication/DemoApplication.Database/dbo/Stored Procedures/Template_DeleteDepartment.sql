-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_DeleteDepartment 
	@Id int,
	@DepartmentId char(5)
AS
BEGIN
	DELETE FROM Department_Template WHERE TemplateId = @Id AND Department_Cd = @DepartmentIdEND
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddDepartment 
	@Id int OUTPUT,
	@DepartmentId char(5)
AS
BEGIN
	insert into Department_Template 
		(TemplateId, Department_Cd)
	values 
		(@Id, @DepartmentId)
END
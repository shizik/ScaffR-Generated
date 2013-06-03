-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddAllDepartment 
	@Id int
AS
BEGIN
  	INSERT INTO Department_Template (TemplateId, Department_Cd)
	SELECT @Id, Department_Cd FROM Department
	WHERE Department_Cd NOT IN (SELECT Department_Cd FROM Department_Template WHERE TemplateId = @Id)

	SELECT Departments.*
	FROM Departments INNER JOIN Department_Template ON Departments.Id = Department_Template.Department_Cd
	WHERE Department_Template.TemplateId = @Id  
END
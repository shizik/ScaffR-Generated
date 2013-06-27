-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/21/2013
-- Description:	Returns single employee with associated assignments
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetById] 
	@Id char(30) 	
AS
BEGIN
	SET NOCOUNT ON;

	SELECT *
	FROM Employees
	WHERE Id = @Id

	SELECT TemplateId From Person_Template
	WHERE Employee_Cd = @Id
END
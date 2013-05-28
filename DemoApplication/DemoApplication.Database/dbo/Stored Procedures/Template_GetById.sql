-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Template_GetById] 
	-- Add the parameters for the stored procedure here
	@Id int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM Templates WHERE Id = @Id

	SELECT Departments.*
	FROM Departments INNER JOIN Department_Template ON Departments.Id = Department_Template.Department_Cd
	WHERE Department_Template.TemplateId = @Id

	SELECT Tasks.*
	FROM Tasks
	WHERE Tasks.TemplateId = @Id

END
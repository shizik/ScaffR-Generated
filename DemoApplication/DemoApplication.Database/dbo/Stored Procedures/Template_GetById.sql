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

	SELECT Tasks.*,  Task_Template.Principal_Cd AS PrincipalId
	FROM Tasks INNER JOIN Task_Template ON Tasks.Id = Task_Template.TaskId
	WHERE Tasks.TemplateId = @Id

END
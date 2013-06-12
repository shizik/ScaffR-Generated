CREATE PROCEDURE [dbo].[Template_GetActivity] 
	@Id int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM TemplateActivity 
	WHERE TemplateId = @Id
	ORDER BY [DateTime]

END
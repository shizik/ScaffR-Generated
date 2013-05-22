-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/20/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_Brief 
	
	@Company_Cd char(3)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		TemplateId, 
		Company_Cd, 
		Name, 
		Category,
		(SELECT COUNT(1) FROM dbo.Task_Template WHERE TemplateId = TemplateId) AS 'Tasks'
	FROM Template 
	Where Company_Cd = @Company_Cd

END
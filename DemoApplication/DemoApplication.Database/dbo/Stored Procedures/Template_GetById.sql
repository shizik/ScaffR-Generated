-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Template_GetById] 
	-- Add the parameters for the stored procedure here
	@TemplateId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM Templates where Id = @TemplateId

	Select * from Tasks where TemplateId = @TemplateId
END
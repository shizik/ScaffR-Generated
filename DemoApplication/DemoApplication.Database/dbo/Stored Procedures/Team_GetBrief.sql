-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetBrief 
	-- Add the parameters for the stored procedure here
	@CompanyCode char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		*
	FROM [dbo].[TeamBriefs] 
	where CompanyId = @CompanyCode	

END
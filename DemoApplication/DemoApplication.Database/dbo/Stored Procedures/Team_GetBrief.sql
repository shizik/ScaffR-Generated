-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetBrief 
	-- Add the parameters for the stored procedure here
	@Company_Cd char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		Team_Cd, 
		Name, 
		Company_Cd,
		1 as 'Completed'
	FROM [dbo].[Team] 
	where Company_Cd = @Company_Cd
	


END
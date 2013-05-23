-- =============================================
-- Author:		Rod Johnson
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE Employee_GetPrincipals 
	-- Add the parameters for the stored procedure here
	@Company_Cd char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select p.* from Principals p inner join Assignments a on p.Id = a.PrincipalId

END
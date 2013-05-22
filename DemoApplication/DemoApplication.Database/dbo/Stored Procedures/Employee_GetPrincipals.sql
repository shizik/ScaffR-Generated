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

    select Employee_Cd as 'Principal_Cd', Last_Name_Txt + ',' + First_Name_Txt as 'Name', 0 as 'IsTeam' from Person_Main where Company_Cd = @Company_Cd

	union

	Select Team_Cd as 'Principal_Cd', Name, 1 as 'IsTeam' from Team where Company_Cd = @Company_Cd
END
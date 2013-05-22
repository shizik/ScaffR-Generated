-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Principal_GetAvailable] 
	-- Add the parameters for the stored procedure here
	@AssignmentId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @Company_Cd char(3)

	select @Company_Cd = Company_Cd from Person_Main p inner join Assignment a on p.Employee_Cd = a.Employee_Cd

    select Employee_Cd as 'Principal_Cd', Last_Name_Txt + ',' + First_Name_Txt as 'Name', 0 as 'IsTeam' from Person_Main where Company_Cd = @Company_Cd

	union

	Select Team_Cd as 'Principal_Cd', Name, 1 as 'IsTeam' from Team where Company_Cd = @Company_Cd

END
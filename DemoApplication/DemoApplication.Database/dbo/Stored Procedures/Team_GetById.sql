-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetById 
	-- Add the parameters for the stored procedure here
	@TeamCode char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --Get Team values
	Select * from Teams where Id = @TeamCode

	-- Getting all tasks for the team
	Select * from Assignments where PrincipalId = @TeamCode

	-- Get all team members
	Select e.* From Employees e inner join Person_Team p on e.Id = p.Employee_Cd
	where p.Team_Cd = @TeamCode

END
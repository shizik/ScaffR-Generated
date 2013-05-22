-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetById 
	-- Add the parameters for the stored procedure here
	@Team_Cd char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Select * from Team where Team_Cd = @Team_Cd

	Select * from Assignment where Principal_Cd = @Team_Cd

	Select * From Team_Employee e inner join Person_Main p on e.Employee_Cd = p.Employee_Cd
	where e.Team_Cd = @Team_Cd

END
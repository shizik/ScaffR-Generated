-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/5/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Employee_GetMilestoneDate 
	-- Add the parameters for the stored procedure here
	@MilestoneId int, -- HireDate, TerminationDate, etc
	@MilestoneValue int, -- Adding days negative would be days before, positive would be days after, 0 would be exact daye
	@Employee_Cd char(30),
	@ExactDate datetime OUTPUT
AS
BEGIN
	
	-- IF @MilestoneId = 1 --(1 is hire date)
	--	Begin
			
	--	End

	--IF @MilestoneId = 2 --(2 is Termination Date date)
	--	Begin
			
	--	End

RETURN 

END
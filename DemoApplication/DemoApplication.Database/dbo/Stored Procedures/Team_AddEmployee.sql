-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Team_AddEmployee] 
	-- Add the parameters for the stored procedure here
	@Team_Cd char(30), 
	@Employee_Cd char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	-- Insert statements for procedure here
	if @Team_Cd is null and @Employee_Cd is null 
		begin
			return 0 
		end 
	else
		begin
			Insert into Person_Team (Employee_Cd,Team_Cd) values(@Employee_Cd,@Team_Cd)
			return @Team_Cd
		end
    
END
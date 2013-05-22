-- =============================================
-- Author:		Rod Johnson
-- Create date: April 29, 2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[List_GetByEmployee] 
	-- Add the parameters for the stored procedure here
	@EmployeeCd char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT Company_Cd,Employee_Cd,ListId,Name from Person_List 
	where Employee_Cd=@EmployeeCd
END
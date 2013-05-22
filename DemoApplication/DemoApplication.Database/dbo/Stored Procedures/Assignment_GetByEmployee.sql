-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_GetByEmployee] 
	-- Add the parameters for the stored procedure here	
	@EmployeeCd char(30)
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT AssignmentId,Name,Employee_Cd,TaskId,[Description],DueDate,Principal_Cd,[Status],[Order] from Assignment 
	where Employee_Cd=@EmployeeCd
END
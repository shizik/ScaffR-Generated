-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2012
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_AddPrincipal] 
	-- Add the parameters for the stored procedure here
	
	@AssignmentId int, 
	@PrincipalId char(30) = 0
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	Update Assignment set Principal_Cd=@PrincipalId
	where AssignmentId=@AssignmentId
	Return @AssignmentId
END
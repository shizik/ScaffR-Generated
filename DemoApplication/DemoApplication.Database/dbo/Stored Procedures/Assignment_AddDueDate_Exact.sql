-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_AddDueDate_Exact]
	-- Add the parameters for the stored procedure here
	@AssignmentId int, 
	@DueDate DateTime 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Update Assignment set DueDate=@DueDate
	where AssignmentId=@AssignmentId
END
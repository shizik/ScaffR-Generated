-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_GetById 
	-- Add the parameters for the stored procedure here
	@assignmentId int
AS
BEGIN
	
	SELECT * FROM Assignment WHERE AssignmentId = @assignmentId

END
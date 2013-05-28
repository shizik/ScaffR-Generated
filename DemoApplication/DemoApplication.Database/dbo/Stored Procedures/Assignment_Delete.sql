-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Delete 
	@Id int
AS
BEGIN
	DELETE FROM Assignment WHERE AssignmentId = @Id
END
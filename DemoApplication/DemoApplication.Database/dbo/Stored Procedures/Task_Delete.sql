-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Delete 
	@Id int
AS
BEGIN
	DELETE FROM Task WHERE TaskId = @Id
END
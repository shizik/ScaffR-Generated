-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_GetById 
	@Id int
AS
BEGIN
	
	SELECT * FROM Assignments WHERE Id = @Id

END
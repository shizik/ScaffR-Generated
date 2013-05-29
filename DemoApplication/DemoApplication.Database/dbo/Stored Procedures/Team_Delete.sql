-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_Delete 
	@Id CHAR(30)
AS
BEGIN
	DELETE FROM Team WHERE Team_Cd = @Id
END
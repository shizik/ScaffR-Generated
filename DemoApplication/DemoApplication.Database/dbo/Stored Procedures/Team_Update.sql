-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_Update 
	@Id CHAR(30),
	@Name varchar(50),
	@Description varchar(500)
AS
BEGIN
	UPDATE [dbo].Team
	   SET [Name] = @Name
		  ,[Description] = @Description
	 WHERE Team_Cd = @Id
END
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_Update 
	@Id int,
	@Name varchar(50),
	@Description varchar(500)
AS
BEGIN
	UPDATE [dbo].Template
	   SET [Name] = @Name
		  ,[Description] = @Description
	 WHERE TemplateId = @Id
END
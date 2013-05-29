-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_Delete 
	@Id int
AS
BEGIN
	DELETE FROM Template WHERE TemplateId = @Id
END
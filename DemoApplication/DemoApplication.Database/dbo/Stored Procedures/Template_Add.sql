-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_Add 
	@Id int,
	@Name varchar(50),
	@Description varchar(500)
AS
BEGIN
	insert into Template 
		([Name], [Description])
	values 
		(@Name, @Description)

	SELECT SCOPE_IDENTITY()
END
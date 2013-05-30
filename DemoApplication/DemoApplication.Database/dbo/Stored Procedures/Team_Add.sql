-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_Add 
	@Id CHAR(30),
	@Name varchar(50),
	@Description varchar(500)
AS
BEGIN
	insert into Principal
		(Principal_Cd)
	values 
		(@Id)

	insert into Team
		([Team_Cd], [Name], [Description])
	values 
		(@Id, @Name, @Description)
END
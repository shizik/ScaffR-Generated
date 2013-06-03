-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddAllPosition
	@Id int
AS
BEGIN
  	INSERT INTO Position_Template (TemplateId, Position_Cd)
	SELECT @Id, Position_Cd FROM POSITION 
	WHERE Position_Cd NOT IN (SELECT Position_Cd FROM Position_Template WHERE TemplateId = @Id)
		
	SELECT Positions.*
	FROM Positions INNER JOIN Position_Template ON Positions.Id = Position_Template.Position_Cd
	WHERE Position_Template.TemplateId = @Id
END
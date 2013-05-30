-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_DeletePosition 
	@Id int,
	@PositionId char(5)
AS
BEGIN
	DELETE FROM Position_Template WHERE TemplateId = @Id AND Position_Cd = @PositionIdEND
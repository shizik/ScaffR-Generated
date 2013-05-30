-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddPosition 
	@Id int,
	@PositionId char(5)
AS
BEGIN
	insert into Position_Template 
		(TemplateId, Position_Cd)
	values 
		(@Id, @PositionId)
END
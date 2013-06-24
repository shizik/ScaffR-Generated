-- =============================================
-- Author:		Marko Ilievski
-- Create date: 6/01/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_AddAttachment 
	@Id int,
	@AttachmentId int
AS BEGIN
	insert into Assignment_Attachment (AssignmentId, AttachmentId)
	values (@Id, @AttachmentId)
END
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 6/01/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_AddAttachment 
	@Id int,
	@AttachmentId int
AS BEGIN
	insert into Task_Attachment (TaskId, AttachmentId)
	values (@Id, @AttachmentId)
END
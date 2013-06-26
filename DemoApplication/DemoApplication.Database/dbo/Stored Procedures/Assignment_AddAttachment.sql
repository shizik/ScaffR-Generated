-- =============================================
-- Author:		Marko Ilievski
-- Create date: 6/01/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_AddAttachment 
	@Id int,
	@AttachmentId int,
	@IsUpload bit
AS BEGIN
	INSERT INTO Assignment_Attachment (AssignmentId, AttachmentId, IsUpload)
	VALUES (@Id, @AttachmentId, @IsUpload)
END
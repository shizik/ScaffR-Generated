CREATE PROCEDURE Attachment_Delete 
	@Id int
AS
BEGIN
    DELETE FROM Attachment where AttachmentId = @Id
END
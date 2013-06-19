CREATE PROCEDURE File_Delete 
	@Id int
AS
BEGIN
    DELETE FROM Attachment where AttachmentId = @Id
END
CREATE PROCEDURE File_GetAll 
AS
BEGIN
	SET NOCOUNT ON;

    SELECT AttachmentId AS Id, Name, MimeType, DATALENGTH(Content) AS Size
	FROM Attachment
END
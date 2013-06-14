CREATE PROCEDURE File_GetAll 
AS
BEGIN
	SET NOCOUNT ON;

    select Name, MimeType, DATALENGTH(Content) as Size from Attachment

END
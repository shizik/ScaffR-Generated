CREATE PROCEDURE File_Add 
	@Name varchar(50),
	@MimeType varchar(50),
	@Content varbinary(MAX)
AS
BEGIN
    INSERT INTO Attachment (Name, MimeType, Content)
	VALUES (@Name, @MimeType, @Content)

	SELECT SCOPE_IDENTITY()
END
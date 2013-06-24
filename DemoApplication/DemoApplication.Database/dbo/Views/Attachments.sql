CREATE VIEW dbo.Attachments AS
 
    SELECT AttachmentId AS 'Id', Name, MimeType AS 'Type', DATALENGTH(Content) AS 'Size'
	FROM Attachment

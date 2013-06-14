CREATE TABLE [dbo].[Attachment] (
    [AttachmentId] INT          IDENTITY (1, 1) NOT NULL,
    [Name]         VARCHAR (50) NOT NULL,
    [MimeType]     VARCHAR (50) NOT NULL,
    [Content] VARBINARY(MAX) NOT NULL, 
    CONSTRAINT [PK_Attachment] PRIMARY KEY CLUSTERED ([AttachmentId] ASC)
);


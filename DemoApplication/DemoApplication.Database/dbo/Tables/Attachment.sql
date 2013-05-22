CREATE TABLE [dbo].[Attachment] (
    [AttachmentId] INT          IDENTITY (1, 1) NOT NULL,
    [Name]         VARCHAR (50) NOT NULL,
    [MineType]     VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Attachment] PRIMARY KEY CLUSTERED ([AttachmentId] ASC)
);


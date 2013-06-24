CREATE TABLE [dbo].[Assignment_Attachment] (
    [AssignmentId] INT          NOT NULL,
    [AttachmentId] INT          NOT NULL,
    CONSTRAINT [PK_Assignment_Attachment] PRIMARY KEY CLUSTERED ([AssignmentId] ASC, [AttachmentId] ASC),
    CONSTRAINT [FK_Assignment_Attachment_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [dbo].[Assignment] ([AssignmentId]) ON DELETE CASCADE,
    CONSTRAINT [FK_Assignment_Attachment_Attachment] FOREIGN KEY ([AttachmentId]) REFERENCES [dbo].[Attachment] ([AttachmentId])
);


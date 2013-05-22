CREATE TABLE [dbo].[Task_Attachment] (
    [AttachmentId] INT          NOT NULL,
    [TaskId]       INT          NOT NULL,
    [Name]         VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Task_Attachment] PRIMARY KEY CLUSTERED ([AttachmentId] ASC, [TaskId] ASC),
    CONSTRAINT [FK_Task_Attachment_Attachment] FOREIGN KEY ([AttachmentId]) REFERENCES [dbo].[Attachment] ([AttachmentId]),
    CONSTRAINT [FK_Task_Attachment_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId])
);


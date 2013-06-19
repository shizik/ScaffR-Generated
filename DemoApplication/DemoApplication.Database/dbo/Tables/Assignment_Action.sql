CREATE TABLE [dbo].[Assignment_Action] (
    [AssignmentActionId] INT           IDENTITY (1, 1) NOT NULL,
    [AssignmentId] INT          NOT NULL,
	[AttachmentId] INT          NULL,
    [Name]         VARCHAR (50) NOT NULL,
    CONSTRAINT [FK_Assignment_Action_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [dbo].[Assignment] ([AssignmentId]),
    CONSTRAINT [FK_Assignment_Action_Attachment] FOREIGN KEY ([AttachmentId]) REFERENCES [dbo].[Attachment] ([AttachmentId]), 
    CONSTRAINT [PK_Assignment_Action] PRIMARY KEY ([AssignmentActionId])
);
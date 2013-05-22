CREATE TABLE [dbo].[Assignment_History] (
    [HistoryId]    INT           IDENTITY (1, 1) NOT NULL,
    [AssignmentId] INT           NOT NULL,
    [Body]         VARCHAR (500) NOT NULL,
    [Created]      DATETIME      CONSTRAINT [DF_Assignment_History_Created] DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Assignment_History] PRIMARY KEY CLUSTERED ([HistoryId] ASC),
    CONSTRAINT [FK_Assignment_History_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [dbo].[Assignment] ([AssignmentId])
);


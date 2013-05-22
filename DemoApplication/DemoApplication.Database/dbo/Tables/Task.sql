CREATE TABLE [dbo].[Task] (
    [TaskId]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (50)  NOT NULL,
    [Description]    VARCHAR (500) NOT NULL,
    [ParentTaskId]   INT           NULL,
    [MilestoneId]    INT           NOT NULL,
    [MilestoneValue] INT           NOT NULL,
    [TemplateId]     INT           NULL,
    [Recurring]      BIT           CONSTRAINT [DF_Task_Recurring] DEFAULT ((0)) NOT NULL,
    [ReminderInfo]   VARCHAR (50)  NULL,
    [AssignmentMode] TINYINT       NULL,
    [CategoryId]     INT           NOT NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskId] ASC),
    CONSTRAINT [FK_Task_Milestone] FOREIGN KEY ([MilestoneId]) REFERENCES [dbo].[Milestone] ([MilestoneId]),
    CONSTRAINT [FK_Task_Task] FOREIGN KEY ([ParentTaskId]) REFERENCES [dbo].[Task] ([TaskId]),
    CONSTRAINT [FK_Task_Task_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Task_Category] ([CategoryId])
);


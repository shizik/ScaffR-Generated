CREATE TABLE [dbo].[Task_Template] (
    [TaskId]       INT       NOT NULL,
    [TemplateId]   INT       NOT NULL,
    [Principal_Cd] CHAR (10) NULL,
    CONSTRAINT [PK_Task_Template] PRIMARY KEY CLUSTERED ([TaskId] ASC, [TemplateId] ASC),
    CONSTRAINT [FK_Task_Template_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId]),
    CONSTRAINT [FK_Task_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId])
);


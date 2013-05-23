CREATE TABLE [dbo].[Task_Template] (
    [TaskId]       INT       NOT NULL,
    [TemplateId]   INT       NOT NULL,
    [Principal_Cd] CHAR (30) NOT NULL,
    CONSTRAINT [PK_Task_Template] PRIMARY KEY CLUSTERED ([TaskId] ASC, [TemplateId] ASC),
    CONSTRAINT [FK_Task_Template_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId]),
    CONSTRAINT [FK_Task_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId]), 
    CONSTRAINT [FK_Task_Template_Principal] FOREIGN KEY ([Principal_Cd]) REFERENCES dbo.Principal([Principal_Cd])
);


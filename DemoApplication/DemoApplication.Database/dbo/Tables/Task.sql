CREATE TABLE [dbo].[Task] (
    [TaskId]         INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (50)  NOT NULL,
    [Description]    VARCHAR (500) NOT NULL,

    [MilestoneId]    INT           NOT NULL,
    [MilestoneValue] INT           NOT NULL,
    [Interval] INT NOT NULL, 
    [IsBefore] BIT NOT NULL, 
	
	[PrincipalIsTeam]  BIT		   NOT NULL,
	[ResolvedByOne]  BIT		   NULL,
	[Principal_Cd]     CHAR(30)    NOT NULL,
	[Approver_Cd]     CHAR(30)     NULL,
	
	[RequiresSignature]	BIT		   NOT NULL,
    [Recurring]      BIT           NOT NULL,

    [ParentTaskId]   INT           NULL,
    [TemplateId]     INT           NULL,
    [CategoryId]     INT           NOT NULL,

    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskId] ASC),
    CONSTRAINT [FK_Task_Milestone] FOREIGN KEY ([MilestoneId]) REFERENCES [dbo].[Milestone] ([MilestoneId]),
    CONSTRAINT [FK_Task_Task] FOREIGN KEY ([ParentTaskId]) REFERENCES [dbo].[Task] ([TaskId]),
    CONSTRAINT [FK_Task_Task_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Task_Category] ([CategoryId]), 
    CONSTRAINT [FK_Task_Template] FOREIGN KEY ([TemplateId]) REFERENCES dbo.Template([TemplateId]), 
    CONSTRAINT [FK_Task_Principal] FOREIGN KEY ([Principal_Cd]) REFERENCES dbo.Principal([Principal_Cd]),
	CONSTRAINT [FK_Task_Approver] FOREIGN KEY ([Approver_Cd]) REFERENCES dbo.Person_Main([Employee_Cd])
);


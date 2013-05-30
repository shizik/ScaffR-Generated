CREATE TABLE [dbo].[Assignment] (
    [AssignmentId]   INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (50)  NOT NULL,
    [Description]    VARCHAR (500) NOT NULL,
    [IsDone]         BIT           CONSTRAINT [DF_Assignment_isDone] DEFAULT ((0)) NOT NULL,
    [Employee_Cd]    CHAR (30)     NOT NULL,
    [TaskId]         INT           NOT NULL,
    [DueDate]        DATETIME      NOT NULL,
    [CompletedDate]  DATETIME      NULL,
	[ResolvedByOne]  BIT		   NULL,
	[PrincipalIsTeam]  BIT		   NOT NULL,
    [Principal_Cd]   CHAR (30)     NOT NULL,
    [Status]         TINYINT       CONSTRAINT [DF_Assignment_Status] DEFAULT ((0)) NOT NULL,
    [Order]          INT           CONSTRAINT [DF_Assignment_Order] DEFAULT ((0)) NOT NULL,
    [Reocurring]     BIT           NOT NULL,
    [CategoryId] INT NOT NULL, 
    CONSTRAINT [PK_Assignment] PRIMARY KEY CLUSTERED ([AssignmentId] ASC),
    CONSTRAINT [FK_Assignment_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]),
    CONSTRAINT [FK_Assignment_Principal] FOREIGN KEY ([Principal_Cd]) REFERENCES [dbo].[Principal] ([Principal_Cd]),
    CONSTRAINT [FK_Assignment_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId]), 
    CONSTRAINT [FK_Assignment_Task_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Task_Category] ([CategoryId])
);


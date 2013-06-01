CREATE TABLE [dbo].[Assignment] (
    [AssignmentId]   INT           IDENTITY (1, 1) NOT NULL,
    [Name]           VARCHAR (50)  NOT NULL,
    [Description]    VARCHAR (500) NOT NULL,

    [Status]         TINYINT       NOT NULL DEFAULT 1,
    [DueDate]        DATETIME      NOT NULL,
    [CompletedDate]  DATETIME      NULL,

	[PrincipalIsTeam]BIT		   NOT NULL,
	[ResolvedByOne]  BIT		   NULL,
    [Principal_Cd]   CHAR (30)     NOT NULL,
	[Approver_Cd]    CHAR (30)     NULL,
    [Employee_Cd]    CHAR (30)     NOT NULL,

	[RequiresSignature]	BIT		   NOT NULL,
    [Recurring]      BIT           NOT NULL,

    [TaskId]         INT           NOT NULL,
    [CategoryId]	 INT NOT NULL, 

    CONSTRAINT [PK_Assignment] PRIMARY KEY CLUSTERED ([AssignmentId] ASC),
    CONSTRAINT [FK_Assignment_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]),
    CONSTRAINT [FK_Assignment_Principal] FOREIGN KEY ([Principal_Cd]) REFERENCES [dbo].[Principal] ([Principal_Cd]),
    CONSTRAINT [FK_Assignment_Approver] FOREIGN KEY ([Approver_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]),
    CONSTRAINT [FK_Assignment_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId]), 
    CONSTRAINT [FK_Assignment_Task_Category] FOREIGN KEY ([CategoryId]) REFERENCES [dbo].[Task_Category] ([CategoryId])
);
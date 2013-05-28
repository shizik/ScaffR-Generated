CREATE TABLE [dbo].[Person_Milestone] (
    [Employee_Cd]          CHAR (30) NOT NULL,
    [MilestoneId]      INT  NOT NULL,
    [Value]          DATETIME       NOT NULL,
    CONSTRAINT [FK_Person_Milestone_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]), 
    CONSTRAINT [FK_Person_Milestone_Milestone] FOREIGN KEY ([MilestoneId]) REFERENCES [dbo].[Milestone]([MilestoneId]), 
    CONSTRAINT [PK_Person_Milestone] PRIMARY KEY ([Employee_Cd], [MilestoneId])
);


CREATE TABLE [dbo].[Milestone] (
    [MilestoneId] INT          IDENTITY (1, 1) NOT NULL,
    [Name]        VARCHAR (50) NOT NULL,
    [Recurring]   BIT		   NOT NULL,
    [Interval] VARCHAR(20) NULL, 
    [Value] INT NULL, 
    CONSTRAINT [PK_Milestone] PRIMARY KEY CLUSTERED ([MilestoneId] ASC)
);


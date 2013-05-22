CREATE TABLE [dbo].[Task_Category] (
    [CategoryId] INT          IDENTITY (1, 1) NOT NULL,
    [Name]       VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Task_Category] PRIMARY KEY CLUSTERED ([CategoryId] ASC)
);


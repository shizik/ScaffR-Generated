CREATE TABLE [dbo].[Team] (
    [Team_Cd]    CHAR (30)    NOT NULL,
    [Name]       VARCHAR (50) NOT NULL,
    [Company_Cd] NCHAR (10)   NULL,
    [Description] VARCHAR(500) NULL, 
    [CreatedDate] DATETIME NULL, 
    [LatestDueDate] DATETIME NULL, 
    [LastActionDate] DATETIME NULL, 
    CONSTRAINT [PK_Team] PRIMARY KEY CLUSTERED ([Team_Cd] ASC)
);


CREATE TABLE [dbo].[Person_List] (
    [ListId]      INT          IDENTITY (1, 1) NOT NULL,
    [Employee_Cd] CHAR (30)    NOT NULL,
    [Company_Cd]  CHAR (3)     NOT NULL,
    [Name]        VARCHAR (50) NOT NULL,
    CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED ([ListId] ASC),
    CONSTRAINT [FK_Person_List_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd])
);


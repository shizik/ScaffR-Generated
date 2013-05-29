CREATE TABLE [dbo].[Person_Main] (
    [Employee_Cd]    CHAR (30)     NOT NULL,
    [Company_Cd]     CHAR (3)      NOT NULL,
    [Division_Cd]    CHAR (3)      NOT NULL,
    [MajorFunction_Cd] CHAR(5) NOT NULL, 
    [Department_Cd]  CHAR (5)      NOT NULL,
    [First_Name_Txt] VARCHAR (128) NOT NULL,
    [Last_Name_Txt]  VARCHAR (128) NOT NULL,
    CONSTRAINT [PK_Person_Main] PRIMARY KEY CLUSTERED ([Employee_Cd] ASC), 
    CONSTRAINT [FK_Person_Main_Principal] FOREIGN KEY ([Employee_Cd]) REFERENCES dbo.Principal([Principal_Cd]), 
    CONSTRAINT [FK_Person_Main_Department] FOREIGN KEY ([Company_Cd],[Division_Cd],[MajorFunction_Cd],[Department_Cd]) REFERENCES dbo.Department([Company_Cd],[Division_Cd],[MajorFunction_Cd],[Department_Cd])
);


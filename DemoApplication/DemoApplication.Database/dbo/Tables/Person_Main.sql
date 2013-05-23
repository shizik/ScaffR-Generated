CREATE TABLE [dbo].[Person_Main] (
    [Employee_Cd]    CHAR (30)     NOT NULL,
    [Company_Cd]     CHAR (3)      NULL,
    [Division_Cd]    CHAR (3)      NULL,
    [Department_Cd]  CHAR (5)      NULL,
    [First_Name_Txt] VARCHAR (128) NOT NULL,
    [Last_Name_Txt]  VARCHAR (128) NOT NULL,
    CONSTRAINT [PK_Person_Main] PRIMARY KEY CLUSTERED ([Employee_Cd] ASC), 
    CONSTRAINT [FK_Person_Main_Principal] FOREIGN KEY ([Employee_Cd]) REFERENCES dbo.Principal([Principal_Cd])
);


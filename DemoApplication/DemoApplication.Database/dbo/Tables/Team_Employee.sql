CREATE TABLE [dbo].[Team_Employee] (
    [Team_Cd]     CHAR (30) NOT NULL,
    [Employee_Cd] CHAR (30) NOT NULL,
    CONSTRAINT [PK_Team_Employee_1] PRIMARY KEY CLUSTERED ([Team_Cd] ASC, [Employee_Cd] ASC),
    CONSTRAINT [FK_Team_Employee_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]),
    CONSTRAINT [FK_Team_Employee_Team] FOREIGN KEY ([Team_Cd]) REFERENCES [dbo].[Team] ([Team_Cd])
);


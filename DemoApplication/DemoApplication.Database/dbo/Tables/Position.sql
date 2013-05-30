CREATE TABLE [dbo].[Position] (
    [Position_Cd]    CHAR (5)     NOT NULL,
    [Name]  VARCHAR (50) NOT NULL,
    [Company_Cd]     CHAR (3)      NOT NULL,
    [Division_Cd]    CHAR (3)      NOT NULL,
    [MajorFunction_Cd] CHAR(5) NOT NULL, 
    [Department_Cd]  CHAR (5)      NOT NULL,
    CONSTRAINT [PK_Position] PRIMARY KEY CLUSTERED ([Position_Cd] ASC), 
    CONSTRAINT [FK_Position_Department] FOREIGN KEY ([Company_Cd],[Division_Cd],[MajorFunction_Cd],[Department_Cd]) REFERENCES dbo.Department([Company_Cd],[Division_Cd],[MajorFunction_Cd],[Department_Cd])
);


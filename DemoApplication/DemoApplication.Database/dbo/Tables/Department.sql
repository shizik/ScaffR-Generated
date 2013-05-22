CREATE TABLE [dbo].[Department] (
    [Company_Cd]       CHAR (3)  NOT NULL,
    [Division_Cd]      CHAR (3)  NOT NULL,
    [MajorFunction_Cd] CHAR (5)  NOT NULL,
    [Department_Cd]    CHAR (5)  NOT NULL,
    [Department_Desc]  CHAR (40) NOT NULL,
    CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED ([Company_Cd] ASC, [Division_Cd] ASC, [MajorFunction_Cd] ASC, [Department_Cd] ASC)
);


CREATE TABLE [dbo].[Principal] (
    [Company_Cd]   NCHAR (10) NULL,
    [Principal_Cd] CHAR (30)  NOT NULL,
    [IsTeam]         BIT    NOT NULL,
    CONSTRAINT [PK_Principal] PRIMARY KEY CLUSTERED ([Principal_Cd] ASC)
);


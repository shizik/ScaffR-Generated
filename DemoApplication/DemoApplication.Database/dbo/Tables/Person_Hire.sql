CREATE TABLE [dbo].[Person_Hire] (
    [Employee_Cd]          CHAR (30) NOT NULL,
    [OriginalHire_Dt]      DATETIME  NULL,
    [SecondaryHire_Dt]     DATETIME  NULL,
    [Termination_Dt]       DATETIME  NULL,
    [Termination_Type_Cd]  CHAR (50) NULL,
    [Termination_Type_Txt] TEXT      NULL,
    [Active_Ind]           BIT       NULL,
    [Rehire_Ind]           BIT       NULL,
    [Removed_Ind]          BIT       NULL,
    CONSTRAINT [PK_Person_Hire] PRIMARY KEY CLUSTERED ([Employee_Cd] ASC),
    CONSTRAINT [FK_Person_Hire_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd])
);


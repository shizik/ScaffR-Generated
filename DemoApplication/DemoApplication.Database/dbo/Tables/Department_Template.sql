CREATE TABLE [dbo].[Department_Template] (
    [TemplateId]       INT      NOT NULL,
    [Company_Cd]       CHAR (3) NOT NULL,
    [Division_Cd]      CHAR (3) NOT NULL,
    [MajorFunction_Cd] CHAR (5) NOT NULL,
    [Department_Cd]    CHAR (5) NOT NULL,
    CONSTRAINT [PK_Department_Template] PRIMARY KEY CLUSTERED ([TemplateId] ASC, [Company_Cd] ASC, [Division_Cd] ASC, [MajorFunction_Cd] ASC, [Department_Cd] ASC),
    CONSTRAINT [FK_Department_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId])
);


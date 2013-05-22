CREATE TABLE [dbo].[Person_Template] (
    [Employee_Cd] CHAR (30) NOT NULL,
    [TemplateId]  INT       NOT NULL,
    CONSTRAINT [PK_Person_Template] PRIMARY KEY CLUSTERED ([Employee_Cd] ASC, [TemplateId] ASC),
    CONSTRAINT [FK_Person_Template_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd]),
    CONSTRAINT [FK_Person_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId])
);


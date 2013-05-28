CREATE TABLE [dbo].[Department_Template] (
    [TemplateId]       INT      NOT NULL,
    [Department_Cd]    CHAR (5) NOT NULL,
    CONSTRAINT [PK_Department_Template] PRIMARY KEY CLUSTERED ([TemplateId] ASC, [Department_Cd] ASC),
    CONSTRAINT [FK_Department_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId]),
);


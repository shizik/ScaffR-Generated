CREATE TABLE [dbo].[Position_Template] (
    [TemplateId]       INT      NOT NULL,
    [Position_Cd]    CHAR (5) NOT NULL,
    CONSTRAINT [PK_Position_Template] PRIMARY KEY CLUSTERED ([TemplateId], [Position_Cd]),
    CONSTRAINT [FK_Position_Template_Template] FOREIGN KEY ([TemplateId]) REFERENCES [dbo].[Template] ([TemplateId]),
    CONSTRAINT [FK_Position_Template_Position] FOREIGN KEY ([Position_Cd]) REFERENCES [dbo].[Position] ([Position_Cd])
);


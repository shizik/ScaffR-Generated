CREATE TABLE [dbo].[Template] (
    [TemplateId] INT          IDENTITY (1, 1) NOT NULL,
    [Company_Cd] CHAR (3)     NOT NULL,
    [Name]       VARCHAR (50) NOT NULL,
    [Category]   VARCHAR (30) NOT NULL,
    CONSTRAINT [PK_Template] PRIMARY KEY CLUSTERED ([TemplateId] ASC)
);


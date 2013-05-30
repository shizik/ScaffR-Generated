CREATE TABLE [dbo].[Template] (
    [TemplateId] INT          IDENTITY (1, 1) NOT NULL,
    [Company_Cd] CHAR (3)     NULL,
    [Name]       VARCHAR (50) NOT NULL,
    [Category]   VARCHAR (30) NULL,
    [Description] VARCHAR(500) NULL, 
    [DepartmentId] CHAR(3) NULL, 
    [CreatedBy] CHAR(30) NULL, 
    [CreatedDate] DATETIME NULL, 
    [ModifiedDate] DATETIME NULL, 
    CONSTRAINT [PK_Template] PRIMARY KEY CLUSTERED ([TemplateId] ASC), 
    CONSTRAINT [FK_Template_Principal] FOREIGN KEY ([CreatedBy]) REFERENCES dbo.Principal([Principal_Cd])
);


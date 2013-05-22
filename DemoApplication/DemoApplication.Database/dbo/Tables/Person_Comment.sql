CREATE TABLE [dbo].[Person_Comment] (
    [CommentId]   INT           IDENTITY (1, 1) NOT NULL,
    [Employee_Cd] CHAR (30)     NOT NULL,
    [Company_Cd]  CHAR (3)      NOT NULL,
    [Body]        VARCHAR (500) NOT NULL,
    [Created]     DATETIME      NOT NULL,
    [Deleted]     BIT           CONSTRAINT [DF_Person_Comment_Deleted] DEFAULT ((0)) NOT NULL,
    [Author_Cd]   CHAR (30)     NOT NULL,
    CONSTRAINT [PK_Person_Comment_1] PRIMARY KEY CLUSTERED ([CommentId] ASC),
    CONSTRAINT [FK_Person_Comment_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [dbo].[Person_Main] ([Employee_Cd])
);


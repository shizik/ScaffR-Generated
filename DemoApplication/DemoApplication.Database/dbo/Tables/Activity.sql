CREATE TABLE [dbo].[Activity]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[DateTime] DATETIME NOT NULL DEFAULT GETDATE(),
    [Action] VARCHAR(200) NOT NULL, 
    [UserId] CHAR(30) NOT NULL,
    [AssignmentId] INT NULL, 
    [TemplateId] INT NULL, 
    [TaskId] INT NULL, 
    CONSTRAINT [FK_Activity_Person_Main] FOREIGN KEY ([UserId]) REFERENCES Person_Main(Employee_Cd)
)

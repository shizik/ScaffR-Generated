CREATE TABLE [dbo].[Activity]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Action] VARCHAR(200) NOT NULL, 
    [UserId] CHAR(30) NOT NULL,
    [AssignmentId] INT NULL, 
    CONSTRAINT [FK_Activity_Person_Main] FOREIGN KEY ([UserId]) REFERENCES Person_Main(Employee_Cd)
)

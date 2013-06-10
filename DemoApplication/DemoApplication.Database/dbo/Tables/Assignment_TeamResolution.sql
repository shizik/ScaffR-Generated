CREATE TABLE [dbo].[Assignment_TeamResolution]
(
    [AssignmentId] INT NOT NULL, 
    [Employee_Cd] CHAR(30) NOT NULL, 
    CONSTRAINT [FK_Assignment_TeamResolution_Assignment] FOREIGN KEY ([AssignmentId]) REFERENCES [Assignment]([AssignmentId]), 
    CONSTRAINT [FK_Assignment_TeamResolution_Person_Main] FOREIGN KEY ([Employee_Cd]) REFERENCES [Person_Main]([Employee_Cd]), 
    CONSTRAINT [PK_Assignment_TeamResolution] PRIMARY KEY ([Employee_Cd], [AssignmentId])
)

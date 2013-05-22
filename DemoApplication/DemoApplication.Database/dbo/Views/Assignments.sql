
CREATE VIEW dbo.Assignments AS
SELECT
	[AssignmentId] as 'Id',
	[Name],
	[Description], 
	[DueDate],
	[CompletedDate],
	[Principal_Type] as 'PrincipalType',
	[Principal_Cd] as 'PrincipalId'
FROM [dbo].[Assignment]
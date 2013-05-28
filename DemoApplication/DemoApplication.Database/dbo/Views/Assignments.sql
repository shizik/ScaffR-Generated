CREATE VIEW dbo.Assignments AS
SELECT
	[AssignmentId] as 'Id',
	[Name],
	[Description], 
	[DueDate],
	[CompletedDate],
	Case [Status] when 1 then 1 else 0 END AS 'IsDone',
	
	[Principal_Cd] as 'PrincipalId',
	0 AS 'PrincipalIsTeam',
	1 AS 'ResolvedByOne',

	[Employee_Cd] as 'EmployeeId',
	[CategoryId]
FROM [dbo].[Assignment]
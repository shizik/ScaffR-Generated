
CREATE VIEW dbo.Assignments AS
SELECT
	[AssignmentId] as 'Id',
	[Name],
	[Description], 
	[DueDate],
	[CompletedDate],
	[Employee_Cd] as 'EmployeeId',
	[Principal_Type] as 'PrincipalType',
	[Principal_Cd] as 'PrincipalId',
	[CategoryId],
	Case [Status] 
		when 1 then 1 
		else 0
	END AS 'IsDone' 
FROM [dbo].[Assignment]
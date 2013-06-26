CREATE VIEW dbo.Assignments AS
SELECT
	[AssignmentId] as Id,
    [Name],
    [Description],
	CASE
		WHEN [Status] = 1 AND [PrincipalIsTeam] = 1 AND
			 (SELECT COUNT(1)
				FROM Assignment_TeamResolution AS AT 
				WHERE AT.AssignmentId = [Assignment].AssignmentId) > 0 THEN 2
		ELSE [Status]
	END AS 'Status',
    [DueDate],
    [CompletedDate],

	[PrincipalIsTeam],
	[ResolvedByOne],
    [Principal_Cd] as PrincipalId,
	[Approver_Cd] as ApproverId,
    [Employee_Cd] as EmployeeId,

	[RequiresSignature],
	[RequiresDownload],
	[RequiresUpload],
    [Recurring],

    [TaskId],
    [CategoryId]
FROM [Assignment]
CREATE VIEW dbo.Assignments AS
SELECT
	[AssignmentId] as Id,
    [Name],
    [Description],

    [Status],
    [DueDate],
    [CompletedDate],

	[PrincipalIsTeam],
	[ResolvedByOne],
    [Principal_Cd] as PrincipalId,
	[Approver_Cd] as ApproverId,
    [Employee_Cd] as EmployeeId,

	[RequiresSignature],
    [Recurring],

    [TaskId],
    [CategoryId]
FROM [dbo].[Assignment]
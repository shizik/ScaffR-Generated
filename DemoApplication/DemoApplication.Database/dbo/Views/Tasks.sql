CREATE VIEW [dbo].[Tasks]
AS SELECT 
    [TaskId] as Id,
    [Name],
    [Description],

    [MilestoneId],
    [MilestoneValue],
    [Interval],
    [IsBefore],
	
	[PrincipalIsTeam],
	[ResolvedByOne],
    [Principal_Cd] as PrincipalId,
	[Approver_Cd] as ApproverId,
	
	[RequiresSignature],
    [Recurring],

    [ParentTaskId],
    [TemplateId],
    [CategoryId]
FROM [Task] 

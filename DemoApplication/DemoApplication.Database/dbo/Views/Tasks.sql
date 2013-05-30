CREATE VIEW [dbo].[Tasks]
	AS SELECT 
		TaskId as 'Id',
		[Name],
		[Description],
		[Interval],
		[IsBefore],
		[MilestoneId],
		[MilestoneValue],
		[ParentTaskId],
		[PrincipalIsTeam],
		[ResolvedByOne],
		[Principal_Cd] AS PrincipalId,
		[CategoryId],
		[TemplateId]
	 FROM [Task] 

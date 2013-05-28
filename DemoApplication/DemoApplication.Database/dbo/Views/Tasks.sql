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
	
		CASE (SELECT 1 FROM Team WHERE Team.Team_Cd = [Task].Principal_Cd) 
		WHEN 1 THEN 1 ELSE 0 END AS 'PrincipalIsTeam',

		[ResolvedByOne],
		[Principal_Cd] AS PrincipalId,
		[CategoryId],
		[TemplateId]
	 FROM [Task] 

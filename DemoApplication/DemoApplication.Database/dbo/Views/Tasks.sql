CREATE VIEW [dbo].[Tasks]
	AS SELECT 
		TaskId as 'Id',
		[Name],
		[Description],
		[Interval],
		[IsBefore],
		[MilestoneId],
		[MilestoneValue],
		[CategoryId]
	 FROM [Task]

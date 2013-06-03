CREATE VIEW [dbo].[TaskBriefs]
	AS SELECT 
		parent.TaskId as Id,
		parent.Name,
		parent.[Description],
		(SELECT COUNT(1) FROM Task as child WHERE child.ParentTaskId is not NULL AND child.ParentTaskId = parent.TaskId) AS 'TasksCount'
		FROM Task as parent
		WHERE ParentTaskId is NULL

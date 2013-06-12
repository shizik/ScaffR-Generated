CREATE VIEW [dbo].[EmployeeActivity]
AS 
	
	SELECT Activity.DateTime, Activity.Action + ' Assignment ' + Assignment.Name as 'Action', UserId
	FROM Activity INNER JOIN Assignment ON Activity.AssignmentId = Assignment.AssignmentId
	WHERE Activity.AssignmentId IS NOT NULL

	UNION

	SELECT Activity.DateTime, Activity.Action + ' Template ' + Template.Name as 'Action', UserId
	FROM Activity INNER JOIN Template ON Activity.TemplateId = Template.TemplateId
	WHERE Activity.TemplateId IS NOT NULL
	
	UNION

	SELECT Activity.DateTime, Activity.Action + ' Task ' + Task.Name as 'Action', UserId
	FROM Activity INNER JOIN Task ON Activity.TaskId = Task.TaskId
	WHERE Activity.TaskId IS NOT NULL
		
	UNION

	SELECT Activity.DateTime, Activity.Action + ' Task ' + Team.Name as 'Action', UserId
	FROM Activity INNER JOIN Team ON Activity.TeamId = Team.Team_Cd
	WHERE Activity.TeamId IS NOT NULL
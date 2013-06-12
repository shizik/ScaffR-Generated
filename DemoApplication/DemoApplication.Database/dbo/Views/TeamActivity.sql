CREATE VIEW [dbo].[TeamActivity]
AS 
	SELECT Activity.DateTime, Activity.Action + ' by ' + Employees.FirstName + ' ' + Employees.LastName AS 'Action', Activity.TeamId
	FROM Activity INNER JOIN Employees ON Activity.UserId = Employees.Id
	WHERE Activity.TeamId IS NOT NULL
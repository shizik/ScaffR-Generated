CREATE VIEW [dbo].[TemplateActivity]
AS 
	SELECT Activity.DateTime, Activity.Action + ' by ' + Employees.FirstName + ' ' + Employees.LastName AS 'Action', Activity.TemplateId
	FROM Activity INNER JOIN Employees ON Activity.UserId = Employees.Id
	WHERE Activity.TemplateId IS NOT NULL

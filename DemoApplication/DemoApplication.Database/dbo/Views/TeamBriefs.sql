CREATE VIEW [dbo].[TeamBriefs]
	AS SELECT 	
		Team_Cd as Id,
		[Name],
		[Company_Cd] as 'CompanyId',
		[Description],
		CreatedDate as 'DateInitiated',
		LastActionDate as 'DateLastAction',
		(SELECT COUNT(1) FROM dbo.Person_Team WHERE Team.Team_Cd = Person_Team.Team_Cd) as 'EmployeesCount',
	    (SELECT COUNT(1) FROM dbo.Assignment WHERE [Status] = 1 AND DueDate > GETDATE() AND Team.Team_Cd = Assignment.Principal_Cd) AS 'Open',
	    (SELECT COUNT(1) FROM dbo.Assignment WHERE [Status] = 1 AND DueDate <= GETDATE() AND Team.Team_Cd = Assignment.Principal_Cd) AS 'Overdue',
	    (SELECT COUNT(1) FROM dbo.Assignment WHERE [Status] = 2 AND Team.Team_Cd = Assignment.Principal_Cd) AS 'Pending',
	    (SELECT COUNT(1) FROM dbo.Assignment WHERE [Status] = 3 AND Team.Team_Cd = Assignment.Principal_Cd) AS 'Closed',
		(SELECT TOP 1 DueDate FROM dbo.Assignment WHERE Team.Team_Cd = Assignment.Principal_Cd ORDER BY DueDate DESC) AS 'LatestDueDate',
		90 as 'Performance'
	 FROM dbo.Team
	 GROUP BY Team_Cd, [Name], [Company_Cd], [Description], CreatedDate, LastActionDate
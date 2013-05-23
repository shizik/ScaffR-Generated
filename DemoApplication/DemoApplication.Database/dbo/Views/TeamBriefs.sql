CREATE VIEW [dbo].[TeamBriefs]
	AS SELECT 	
		t.*,
		12 as 'EmployeesCount',
		1 as 'Open',
		2 as 'Overdue',
		3 as 'Closed',
		4 as 'Performance'
	 FROM [Teams] t
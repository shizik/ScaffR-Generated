CREATE VIEW [dbo].[Teams]
	AS SELECT 
	
	Team_Cd as Id,
	[Name],
	[Company_Cd] as 'CompanyId',
	[Description],
	CreatedDate as 'DateInitiated',
	LastActionDate as 'DateLastAction'

	 FROM [Team]
	 

	 --public DateTime DateInitiated { get; set; }
        --public DateTime DateLastAction { get; set; }
        --public DateTime LatestDueDate { get; set; }

        --//
        --// Task Related

        --public int Open { get; set; }
        --public int Overdue { get; set; }
        --public int Closed { get; set; }
        --public int Performance { get; set; }
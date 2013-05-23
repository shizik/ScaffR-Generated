CREATE VIEW [dbo].[Principals]
	AS 
	SELECT Person_Main.Employee_Cd as 'Id', 
		   Last_Name_Txt + ' ' + First_Name_Txt as 'Name', 
		   CAST(0 as Bit) as 'IsTeam', 
		   Company_Cd as 'CompanyId',
		   Person_Team.Team_Cd as 'TeamId' 
	FROM Person_Main INNER JOIN Person_Team ON Person_Main.Employee_Cd = Person_Team.Employee_Cd

	UNION

	SELECT Team_Cd as 'Id', 
		   Name, 
		   CAST(1 as BIT) as 'IsTeam', 
		   Company_Cd as 'CompanyId',
		   NULL as 'TeamId' 
	FROM Team

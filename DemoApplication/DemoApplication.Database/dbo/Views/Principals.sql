CREATE VIEW [dbo].[Principals]
	AS 
	SELECT Employee_Cd as 'Id', 
		   Last_Name_Txt + ',' + First_Name_Txt as 'Name', 
		   CAST(0 as Bit) as 'IsTeam', 
		   Company_Cd as 'CompanyId' from Person_Main

	UNION

	SELECT Team_Cd as 'Id', 
		   Name, 
		   CAST(1 as BIT) as 'IsTeam', 
		   Company_Cd as 'CompanyId' from Team

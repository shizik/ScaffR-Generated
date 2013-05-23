CREATE VIEW [dbo].[Principals]
	AS 
 select Employee_Cd as 'PrincipalId', Last_Name_Txt + ',' + First_Name_Txt as 'Name', CAST(0 as Bit) as 'IsTeam', Company_Cd as 'CompanyId' from Person_Main

	union

	Select Team_Cd as 'PrincipalId', Name, CAST(1 as BIT) as 'IsTeam', Company_Cd as 'CompanyId' from Team

CREATE VIEW [dbo].[Departments]
	AS SELECT 
		Department_Cd as 'Id',
		Department_Desc as 'Name',
		Company_Cd as 'CompanyId'		
	FROM [Department]		
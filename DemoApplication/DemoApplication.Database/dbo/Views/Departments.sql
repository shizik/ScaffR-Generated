CREATE VIEW [dbo].[Departments]
	AS SELECT 
		Department_Cd as 'DepartmentId',
		Department_Desc as 'Name',
		Company_Cd as 'CompanyId'		
	FROM [Department]		
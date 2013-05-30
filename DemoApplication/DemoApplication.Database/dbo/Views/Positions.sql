CREATE VIEW [dbo].[Positions]
	AS SELECT 
		Position_Cd as 'Id',
		Name,
		Department_Cd as 'DepartmentId'		
	FROM Position		
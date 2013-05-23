CREATE VIEW [dbo].[Templates]
	AS SELECT 
		[TemplateId] as 'Id',
		[Name],
		[Description],
		[Company_Cd] as 'CompanyId'
	 FROM [Template]

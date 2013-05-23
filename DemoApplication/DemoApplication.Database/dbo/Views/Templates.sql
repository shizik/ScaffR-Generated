CREATE VIEW [dbo].[Templates]
	AS SELECT 
		[TemplateId] as 'Id',
		[Name],
		[Description],
		[Company_Cd] as 'CompanyId',
		[DepartmentId],
		[CreatedDate] as 'DateCreated',
		[ModifiedDate] as 'DateModified',
		[CreatedBy]
	 FROM [Template]

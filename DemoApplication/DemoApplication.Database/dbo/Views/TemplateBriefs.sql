CREATE VIEW [dbo].[TemplateBriefs]
	AS SELECT 
		t.*,
		d.Name as 'DepartmentName',
		(SELECT COUNT(1) FROM dbo.Task_Template WHERE Task_Template.TemplateId = t.Id) AS 'TasksCount'
		FROM [Templates] t LEFT OUTER JOIN [Departments] d on t.DepartmentId = d.Id

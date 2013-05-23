CREATE VIEW [dbo].[TemplateBriefs]
	AS SELECT 
		t.*,
		d.Name as 'DepartmentName',
		(SELECT COUNT(1) FROM dbo.Task_Template WHERE TemplateId = TemplateId) AS 'TasksCount'
		FROM [Templates] t LEFT OUTER JOIN [Departments] d on t.DepartmentId = d.DepartmentId

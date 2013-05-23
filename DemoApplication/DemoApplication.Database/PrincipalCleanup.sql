DELETE FROM dbo.Task_Template WHERE Principal_Cd NOT IN (
	SELECT Employee_Cd FROM dbo.Person_Main
	UNION
	SELECT Team_Cd FROM dbo.Team
)

DELETE FROM dbo.Assignment_History WHERE AssignmentId IN (
	SELECT AssignmentId FROM dbo.Assignment WHERE Principal_Cd NOT IN (
		SELECT Employee_Cd FROM dbo.Person_Main
		UNION
		SELECT Team_Cd FROM dbo.Team
	)
)

DELETE FROM dbo.Assignment WHERE Principal_Cd NOT IN (
	SELECT Employee_Cd FROM dbo.Person_Main
	UNION
	SELECT Team_Cd FROM dbo.Team
)

/*DELETE FROM dbo.Template WHERE CreatedBy NOT IN (
	SELECT Employee_Cd FROM dbo.Person_Main
	UNION
	SELECT Team_Cd FROM dbo.Team
)

DELETE FROM dbo.Principal WHERE Principal_Cd NOT IN (
	SELECT Employee_Cd FROM dbo.Person_Main
	UNION
	SELECT Team_Cd FROM dbo.Team
)*/
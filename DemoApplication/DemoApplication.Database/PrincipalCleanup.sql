UPDATE Assignment SET PrincipalIsTeam=1 WHERE PrincipalIsTeam=0 AND Principal_Cd not in (select Employee_Cd FRom Person_Main)
UPDATE Assignment SET PrincipalIsTeam=0 WHERE PrincipalIsTeam=1 AND Principal_Cd not in (select Team_Cd FRom Team)

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


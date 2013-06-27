CREATE VIEW dbo.ApproverAssignments AS
	SELECT Assignment.AssignmentId AS Id,
		   CASE
				WHEN [Status] = 1 AND [PrincipalIsTeam] = 1 AND 
					 (SELECT 1 
					  FROM Assignment_TeamResolution AS AT 
					  WHERE AT.AssignmentId = Assignment.AssignmentId AND AT.Employee_Cd = Assignment.Employee_Cd) = 1 THEN 2
		        ELSE Assignment.[Status]
		   END AS 'Status',
		   Assignment.Name AS Name,  
		   [Description],
		   P.Employee_Cd AS EmployeeId,
		   Assignment.Principal_Cd AS PrincipalId,
		   P.Last_Name_Txt + ' ' + P.First_Name_Txt AS EmployeeName,
		   A.Last_Name_Txt + ' ' + A.First_Name_Txt AS ApproverName,
		   CategoryId,
		   Assignment.DueDate AS DueDate
	FROM Assignment INNER JOIN Person_Main as P ON Assignment.Employee_Cd = P.Employee_Cd
					LEFT OUTER JOIN Person_Main as A ON Assignment.Approver_Cd = A.Employee_Cd
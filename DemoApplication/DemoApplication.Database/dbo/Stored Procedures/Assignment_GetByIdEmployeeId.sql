-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_GetByIdEmployeeId 
	@Id int,
	@EmployeeId char(30)
AS
BEGIN
	
	SELECT 	[AssignmentId] as Id,
			[Name],
			[Description],
			CASE
				WHEN [Status] = 1 AND [PrincipalIsTeam] = 1 AND
					 (SELECT 1
						FROM Assignment_TeamResolution AS AT 
						WHERE AT.AssignmentId = @Id AND AT.Employee_Cd = @EmployeeId) = 1 THEN 2
				ELSE [Status]
			END AS 'Status',
			[DueDate],
			[CompletedDate],

			[PrincipalIsTeam],
			[ResolvedByOne],
			[Principal_Cd] as PrincipalId,
			[Approver_Cd] as ApproverId,
			[Employee_Cd] as EmployeeId,

			[RequiresSignature],
			[Recurring],

			[TaskId],
			[CategoryId] 
	FROM Assignment WHERE AssignmentId = @Id

END
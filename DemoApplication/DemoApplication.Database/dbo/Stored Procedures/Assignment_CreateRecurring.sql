-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_CreateRecurring 
	@Id int
AS
BEGIN
		IF(EXISTS (SELECT 1 FROM Assignment WHERE AssignmentId = @Id AND Recurring = 1))
		BEGIN
			DECLARE @MilestoneInterval varchar(50)
			DECLARE @MilestoneValue INT

			SELECT @MilestoneInterval = Milestone.Interval, @MilestoneValue = Value
			FROM Milestone INNER JOIN Task ON Milestone.MilestoneId = Task.MilestoneId

			INSERT INTO Assignment 
				([Name], [Description],
				
				 [DueDate],
				
				 [PrincipalIsTeam], [ResolvedByOne], [Principal_Cd], [Approver_Cd], [Employee_Cd],
				 [RequiresSignature], [Recurring],
				 [AssignmentApprovalId], [TaskId], [CategoryId])
			SELECT 	[Name], [Description], 
					
					CASE @MilestoneInterval 
						when 'Year' then DATEADD(year, @MilestoneValue, [DueDate]) 
						when 'Quarter' then DATEADD(quarter, @MilestoneValue, [DueDate]) 
						when 'Month' then DATEADD(month, @MilestoneValue, [DueDate])
						when 'Week' then DATEADD(week, @MilestoneValue, [DueDate])
						else DATEADD(day, @MilestoneValue, [DueDate]) 
					END,				
					
					[PrincipalIsTeam], [ResolvedByOne], [Principal_Cd], [Approver_Cd], [Employee_Cd],
					[RequiresSignature], [Recurring],
					[AssignmentApprovalId], [TaskId], [CategoryId] 
			FROM Assignment WHERE AssignmentId = @Id
		END
END
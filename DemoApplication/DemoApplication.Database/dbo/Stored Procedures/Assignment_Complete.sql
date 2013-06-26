-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Complete 
	@Id int,
	@EmployeeId CHAR(30)
AS
BEGIN
	DECLARE @ApproverId CHAR(30)
	DECLARE @AssignmentApprovalId INT
	DECLARE @ResolvedByOne BIT
	DECLARE @PrincipalIsTeam BIT
	DECLARE @PrincipalId CHAR(30)

	DECLARE @TeamCount INT = 0
	DECLARE @AssignmentCount INT = 0

	SELECT @ApproverId = Approver_Cd, 
		   @AssignmentApprovalId = AssignmentApprovalId,
		   @ResolvedByOne = ResolvedByOne,
		   @PrincipalIsTeam = PrincipalIsTeam,
		   @PrincipalId = Principal_Cd
	FROM Assignment WHERE AssignmentId = @Id

	IF(@PrincipalIsTeam = 1)
		BEGIN
			IF(@EmployeeId NOT IN (SELECT Employee_Cd FROM Assignment_TeamResolution WHERE AssignmentId = @Id)) 
				INSERT INTO Assignment_TeamResolution ([AssignmentId], [Employee_Cd])
				VALUES (@Id, @EmployeeId)

			SELECT @TeamCount = COUNT(1) FROM Person_Team WHERE Team_Cd = @PrincipalId
			SELECT @AssignmentCount = COUNT(1) FROM Assignment_TeamResolution WHERE AssignmentId = @Id

			IF(@ResolvedByOne = 0 AND @TeamCount > @AssignmentCount)
				BEGIN
					EXECUTE dbo.Assignment_GetById @Id
					RETURN
				END
		END

	IF(@ApproverId IS NULL)
		BEGIN
			UPDATE [dbo].[Assignment] SET [CompletedDate] = GETDATE(), [Status] = 3 
			WHERE AssignmentId = @Id

			IF(@AssignmentApprovalId IS NOT NULL)
				UPDATE [dbo].[Assignment] SET [CompletedDate] = GETDATE(), [Status] = 3 
				WHERE AssignmentId = @AssignmentApprovalId

			DECLARE @AssignmentId INT = (CASE WHEN @AssignmentApprovalId IS NOT NULL THEN @AssignmentApprovalId ELSE @Id END)

			EXECUTE Assignment_CreateRecurring @AssignmentId
		END
	ELSE
		BEGIN
			 UPDATE [dbo].[Assignment]
			   SET [CompletedDate] = GETDATE()
				  ,[Status] = 2
			 WHERE AssignmentId = @Id

			 INSERT INTO Assignment 
				([Name], [Description], [DueDate],
				 [PrincipalIsTeam], [ResolvedByOne], [Principal_Cd], [Approver_Cd], [Employee_Cd],
				 [RequiresSignature], [RequiresDownload], [RequiresUpload], [Recurring],
				 [AssignmentApprovalId], [TaskId], [CategoryId])
			 SELECT 
				 'APPROVE: ' + [Name], [Description], [DueDate],
				 0, NULL, @ApproverId, NULL, [Employee_Cd],
				 [RequiresSignature], [RequiresDownload], [RequiresUpload], 0,
				 @Id, [TaskId], [CategoryId] 
			 FROM Assignment WHERE AssignmentId = @Id
		END

	EXECUTE dbo.Assignment_GetById @Id
END
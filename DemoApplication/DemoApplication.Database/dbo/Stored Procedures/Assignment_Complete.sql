-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Complete 
	@Id int
AS
BEGIN
	DECLARE @ApproverId CHAR(30)
	DECLARE @AssignmentApprovalId INT

	SELECT @ApproverId = Approver_Cd, 
		   @AssignmentApprovalId = AssignmentApprovalId 
	FROM Assignment WHERE AssignmentId = @Id

	IF(@ApproverId IS NULL)
		BEGIN
			UPDATE [dbo].[Assignment] SET [CompletedDate] = GETDATE(), [Status] = 3 WHERE AssignmentId = @Id

			IF(@AssignmentApprovalId IS NOT NULL)
				UPDATE [dbo].[Assignment] SET [CompletedDate] = GETDATE(), [Status] = 3 WHERE AssignmentId = @AssignmentApprovalId
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
				 [RequiresSignature], [Recurring],
				 [AssignmentApprovalId], [TaskId], [CategoryId])
			 SELECT 
				 'APPROVE: ' + [Name], [Description], [DueDate],
				 0, NULL, @ApproverId, NULL, [Employee_Cd],
				 [RequiresSignature], [Recurring],
				 @Id, [TaskId], [CategoryId] 
			 FROM Assignment WHERE AssignmentId = @Id
		END

	EXECUTE dbo.Assignment_GetById @Id
END
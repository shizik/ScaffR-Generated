-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Update 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	
	@MilestoneId int,
	@MilestoneValue int,
	@Interval int,
	@IsBefore bit,
	
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@PrincipalId CHAR(30),
	@ApproverId CHAR(30),

	@RequiresSignature BIT,
    @Recurring BIT,

	@ParentTaskId int,
	@TemplateId int,
	@CategoryId int,

	@UpdateRelated bit,

	@Files varchar(200)
AS
BEGIN
	UPDATE [dbo].[Task]
		SET [Name] = @Name
			,[Description] = @Description

			,[MilestoneId] = @MilestoneId
			,[MilestoneValue] = @MilestoneValue
			,[Interval] = @Interval
			,[IsBefore] = @IsBefore

			,[PrincipalIsTeam] = @PrincipalIsTeam
			,[ResolvedByOne] = @ResolvedByOne
  			,[Principal_Cd] = @PrincipalId
  			,[Approver_Cd] = @ApproverId

  			,[RequiresSignature] = @RequiresSignature
			,[Recurring] = @Recurring

			,[ParentTaskId] = @ParentTaskId
			,[TemplateId] = @TemplateId
			,[CategoryId] = @CategoryId
		WHERE TaskId = @Id

 	INSERT INTO Task_Attachment (TaskId, AttachmentId)
	SELECT @Id, split.Item
	FROM dbo.DelimitedSplit8K(@Files, ',') as split
	WHERE split.Item NOT IN (SELECT AttachmentId FROM Task_Attachment WHERE TaskId = @Id)

	DELETE FROM Task_Attachment
	WHERE TaskId = @Id AND
		  AttachmentId NOT IN(SELECT split.Item FROM dbo.DelimitedSplit8K(@Files, ',') as split)

	IF(@UpdateRelated = 1)
	BEGIN
		UPDATE [dbo].[Task]
			SET [Name] = @Name
				,[Description] = @Description

				,[MilestoneId] = @MilestoneId
				,[MilestoneValue] = @MilestoneValue
				,[Interval] = @Interval
				,[IsBefore] = @IsBefore

				,[PrincipalIsTeam] = @PrincipalIsTeam
				,[ResolvedByOne] = @ResolvedByOne
  				,[Principal_Cd] = @PrincipalId
  				,[Approver_Cd] = @ApproverId

  				,[RequiresSignature] = @RequiresSignature
				,[Recurring] = @Recurring

				,[CategoryId] = @CategoryId
			WHERE ParentTaskId = @Id

		DELETE FROM Task_Attachment
		WHERE TaskId IN (SELECT Id FROM Tasks WHERE ParentTaskId = @Id)

		INSERT INTO Task_Attachment (TaskId, AttachmentId)
		SELECT T.Id, TA.AttachmentId
		FROM Tasks AS T, Task_Attachment AS TA
		WHERE T.ParentTaskId = @Id AND TA.TaskId = @Id
	END
END
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Update 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	
	@Status tinyint,
	@DueDate datetime,
	@CompletedDate datetime,
	
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@PrincipalId CHAR(30),
	@ApproverId CHAR(30),
	@EmployeeId CHAR (30),

	@RequiresSignature BIT,
	@RequiresDownload BIT,
	@RequiresUpload BIT,
    @Recurring BIT,

	@TaskId int,
	@CategoryId int,

	@Files varchar(200)
AS
BEGIN
	UPDATE [dbo].[Assignment]
		SET [Name] = @Name
			,[Description] = @Description
			,[DueDate] = @DueDate

			,[PrincipalIsTeam] = @PrincipalIsTeam
			,[ResolvedByOne] = @ResolvedByOne
  			,[Principal_Cd] = @PrincipalId
			,[Approver_Cd] = @ApproverId
			,[Employee_Cd] = @EmployeeId

  			,[RequiresSignature] = @RequiresSignature
			,[RequiresDownload] = @RequiresDownload
			,[RequiresUpload] = @RequiresUpload
			,[Recurring] = @Recurring

			,CategoryId = @CategoryId
		WHERE AssignmentId = @Id

	INSERT INTO Assignment_Attachment (AssignmentId, AttachmentId)
	SELECT @Id, split.Item
	FROM dbo.DelimitedSplit8K(@Files, ',') as split
	WHERE split.Item NOT IN (SELECT AttachmentId FROM Assignment_Attachment WHERE AssignmentId = @Id)

	DELETE FROM Assignment_Attachment
	WHERE AssignmentId = @Id AND
		  AttachmentId NOT IN(SELECT split.Item FROM dbo.DelimitedSplit8K(@Files, ',') as split)
END
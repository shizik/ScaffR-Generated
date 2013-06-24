-- =============================================
-- Author:		Marko Ilievski
-- Create date: 6/01/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Add 
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

	@Files varchar(200)
AS BEGIN
	insert into Task 
		([Name], 
		 [Description], 
		
		 [MilestoneId],
		 [MilestoneValue],
		 [Interval],
		 [IsBefore],

		 [PrincipalIsTeam],  
		 [ResolvedByOne],
 		 [Principal_Cd],
		 [Approver_Cd],

		 [RequiresSignature],
		 [Recurring],

		 [ParentTaskId],
		 [TemplateId],
		 [CategoryId])
	values 
		(@Name,  
		 @Description,  

		 @MilestoneId, 
		 @MilestoneValue, 
		 @Interval, 
		 @IsBefore, 
		 
		 @PrincipalIsTeam, 
		 @ResolvedByOne, 
		 @PrincipalId, 
		 @ApproverId,

		 @RequiresSignature,
		 @Recurring,

		 @ParentTaskId,
		 @TemplateId,
		 @CategoryId)

	SET @Id = SCOPE_IDENTITY()

	IF(@Files IS NOT NULL)
		INSERT INTO Task_Attachment (TaskId, AttachmentId)
		SELECT @Id, split.Item FROM dbo.DelimitedSplit8K(@Files, ',') as split

	IF(@ParentTaskId IS NOT NULL)
		INSERT INTO Task_Attachment (TaskId, AttachmentId)
		SELECT @Id, AttachmentId 
		FROM Task_Attachment WHERE TaskId = @ParentTaskId

	SELECT @Id
END
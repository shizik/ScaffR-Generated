-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddTask 
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
AS
BEGIN
	DECLARE @TaskId INT
	EXECUTE Task_Add @TaskId, @Name, @Description,
					 @MilestoneId, @MilestoneValue, @Interval, @IsBefore,
					 @PrincipalIsTeam, @ResolvedByOne, @PrincipalId, @ApproverId,
					 @RequiresSignature, @Recurring,
					 NULL, NULL, @CategoryId, @Files

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

		 @TaskId,
		 @TemplateId,
		 @CategoryId)

	SET @Id = SCOPE_IDENTITY()

	INSERT INTO Task_Attachment (TaskId, AttachmentId)
	SELECT @Id, AttachmentId 
	FROM Task_Attachment WHERE TaskId = @TaskId

	SELECT @Id
END
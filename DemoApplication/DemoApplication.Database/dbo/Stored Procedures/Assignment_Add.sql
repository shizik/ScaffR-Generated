-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Add 
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

	@Files varchar(200) -- used for proper handling of arguments
AS BEGIN
	insert into Assignment 
		([Name], 
		 [Description], 
		
		 [DueDate],

		 [PrincipalIsTeam],  
		 [ResolvedByOne],
 		 [Principal_Cd],
		 [Approver_Cd],
		 [Employee_Cd],

		 [RequiresSignature],
		 [RequiresDownload],
		 [RequiresUpload],
		 [Recurring],

		 [TaskId],
		 [CategoryId])
	values 
		(@Name,  
		 @Description,  
		
		 @DueDate,
				 
		 @PrincipalIsTeam, 
		 @ResolvedByOne, 
		 @PrincipalId, 
		 @ApproverId,
		 @EmployeeId,

		 @RequiresSignature,
		 @RequiresDownload,
		 @RequiresUpload,
		 @Recurring,

		 @TaskId,
		 @CategoryId)

	SET @Id = SCOPE_IDENTITY()

	INSERT INTO Assignment_Attachment (AssignmentId, AttachmentId)
	SELECT @Id, AttachmentId 
	FROM Task_Attachment WHERE TaskId = @TaskId

	SELECT @Id
END
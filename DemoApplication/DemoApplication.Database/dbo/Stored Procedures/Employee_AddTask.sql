-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_AddTask] 
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
	
	@DueDate datetime,
	@EmployeeId CHAR(30)
AS
BEGIN
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

		 @CategoryId)

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
		 @Recurring,

		 SCOPE_IDENTITY(),
		 @CategoryId)

	SELECT SCOPE_IDENTITY()
END
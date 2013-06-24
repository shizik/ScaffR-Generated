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
	@EmployeeId CHAR(30),

	@Files varchar(200)
AS
BEGIN
	DECLARE @TaskId INT
	EXECUTE Task_Add @TaskId, @Name, @Description,
					 @MilestoneId, @MilestoneValue, @Interval, @IsBefore,
					 @PrincipalIsTeam, @ResolvedByOne, @PrincipalId, @ApproverId,
					 @RequiresSignature, @Recurring,
					 NULL, NULL, @CategoryId, @Files
					 
	EXECUTE dbo.Assignment_Add @Id, @Name, @Description, 1, @DueDate, NULL,
							   @PrincipalIsTeam, @ResolvedByOne, @PrincipalId, @ApproverId, @EmployeeId,
							   @RequiresSignature, @Recurring,
							   @TaskId, @CategoryId

	SELECT @Id
END
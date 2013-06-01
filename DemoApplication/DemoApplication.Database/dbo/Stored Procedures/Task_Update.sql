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
	@CategoryId int
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
END
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
    @Recurring BIT,

	@TaskId int,
	@CategoryId int
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
		  ,[Recurring] = @Recurring

		  ,CategoryId = @CategoryId
	 WHERE AssignmentId = @Id
END
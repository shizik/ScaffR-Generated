-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Update 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	@DueDate datetime,
	@CompletedDate datetime,
	@IsDone bit,
	@PrincipalId CHAR(30),
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@EmployeeId CHAR(30),
	@CategoryId int
AS
BEGIN
	UPDATE [dbo].[Assignment]
	   SET [Name] = @Name
		  ,[Description] = @Description
		  ,DueDate = @DueDate
		  ,CompletedDate = @CompletedDate
		  ,[Status] = @IsDone
		  ,Principal_Cd = @PrincipalId
		  ,Employee_Cd = @EmployeeId
		  ,CategoryId = @CategoryId
	 WHERE AssignmentId = @Id
END
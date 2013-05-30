-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_Add 
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
	@TaskId int,
	@CategoryId int
AS BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into Assignment 
		([Name], [Description], DueDate, [Status], PrincipalIsTeam, Principal_Cd, ResolvedByOne, Employee_Cd, TaskId, CategoryId,Reocurring)
	values 
		(@Name, @Description, @DueDate, 0, @PrincipalIsTeam, @PrincipalId, @ResolvedByOne, @EmployeeId, @TaskId, @CategoryId,0)

	SELECT SCOPE_IDENTITY()
END
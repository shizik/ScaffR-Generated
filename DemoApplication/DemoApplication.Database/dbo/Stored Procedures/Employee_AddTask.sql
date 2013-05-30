-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_AddTask] 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	@ParentTaskId int,
	@MilestoneId int,
	@MilestoneValue int,
	@Interval int,
	@IsBefore bit,
	@TemplateId int,
	@CategoryId int,
	@DueDate datetime,
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@PrincipalId CHAR(30),
	@EmployeeId CHAR(30)
AS
BEGIN
	insert into Task 
		([Name], [Description], MilestoneId, MilestoneValue, Interval, IsBefore, PrincipalIsTeam, ResolvedByOne, Principal_Cd, CategoryId)
	values 
		(@Name, @Description, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @PrincipalIsTeam, @ResolvedByOne, @PrincipalId, @CategoryId)

	insert into Assignment 
		([Name], [Description], TaskId, DueDate, [Status], Principal_Cd, PrincipalIsTeam, Employee_Cd, CategoryId, ResolvedByOne, Reocurring)
	values 
		(@Name, @Description, SCOPE_IDENTITY(), @DueDate, 0, @PrincipalId, @PrincipalIsTeam, @EmployeeId, @CategoryId, @ResolvedByOne, 0)

	SELECT SCOPE_IDENTITY()
END
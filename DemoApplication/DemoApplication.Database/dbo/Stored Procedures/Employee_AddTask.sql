-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_AddTask] 
	@Id int OUTPUT,
	@Name varchar(50),
	@Description varchar(500),
	@ParentTaskId int,
	@MilestoneId int,
	@MilestoneValue int,
	@Interval int,
	@IsBefore bit,
	@TemplateId int,
	@CategoryId int,
	@PrincipalId CHAR(30),
	@EmployeeId CHAR(30)
AS
BEGIN
	insert into Task 
		([Name], [Description], MilestoneId, MilestoneValue, Interval, IsBefore, CategoryId)
	values 
		(@Name, @Description, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @CategoryId)

	DECLARE @DueDate datetime = GETDATE()

	insert into Assignment 
		([Name], [Description], TaskId, DueDate, [Status], Principal_Cd, Employee_Cd, CategoryId)
	values 
		(@Name, @Description, SCOPE_IDENTITY(), @DueDate, 0, @PrincipalId, @EmployeeId, @CategoryId)

	SELECT @Id = SCOPE_IDENTITY()
END
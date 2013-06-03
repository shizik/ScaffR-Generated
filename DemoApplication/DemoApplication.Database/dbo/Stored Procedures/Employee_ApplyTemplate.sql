-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_ApplyTemplate] 
	-- Add the parameters for the stored procedure here
	@employeeCode char(30),
	@TemplateId int
AS

BEGIN

-- Loop through all tasks in the template

DECLARE @TaskId int
DECLARE @Name varchar(50)
DECLARE @Description varchar(500)
DECLARE @ListId int
DECLARE @ParentTaskId int
DECLARE @MilestoneId int
DECLARE @MilestoneValue int
DECLARE @Recurring bit

DECLARE @Order int = 0

DECLARE  task_cursor CURSOR FOR 
	SELECT TaskId, Name, [Description], ParentTaskId, MilestoneId, MilestoneValue, Recurring FROM Task WHERE TemplateId = @TemplateId

OPEN task_cursor

FETCH NEXT FROM task_cursor
INTO @TaskId, @Name, @Description, @ParentTaskId, @MilestoneId, @MilestoneValue, @Recurring

WHILE @@FETCH_STATUS = 0
BEGIN

	PRINT @TaskId

	-- don't try to apply it if it's already been applied
	-- Is the task is not active then add it... 
	IF NOT EXISTS (SELECT Assignment.AssignmentId FROM Assignment WHERE Assignment.TaskId=@TaskId) 
	-- Can there be a case where the same task is applied?
		BEGIN
			IF NOT EXISTS (SELECT Assignment.AssignmentId FROM Assignment WHERE Assignment.TaskId=@TaskId and Assignment.Employee_Cd=@employeeCode) 
				Begin
					--  If task is completed, then add it. ????
					Exec Assignment_CreateFromTask @employeeCode,@TaskId,@description,@Name,@Order,0
				End
		END
	FETCH NEXT FROM task_cursor
	INTO @TaskId, @Name, @Description, @ListId, @ParentTaskId, @MilestoneId, @MilestoneValue, @Recurring 
END

CLOSE task_cursor
DEALLOCATE task_cursor


-- Create record in Person_Template
/*
select @EmployeeCd=EmployeeCd,@TemplateId=TemplateId from Person_Template 
 where EmployeeCd=@EmployeeCd and TemplateId=@TemplateId

if @TemplateId is null or @EmployeeCd  is null  
 Begin 
     Insert into Person_Template (EmployeeCd,TemplateId) values(@EmployeeCd,@TemplateId)	
	 Select  @EmployeeCd
 End 
 */
RETURN
END
-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Add 
	-- Add the parameters for the stored procedure here
	@Name varchar(50),
	@Description varchar(500),
	@ParentTaskId int,
	@MilestoneId int,
	@MilestoneValue int,
	@TemplateId int,
	@Recurring bit,
	@ReminderInfo varchar(50),
	@AssignmentMode tinyint,
	@CategoryId int,
	@TaskID int output 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into Task 
		([Name], [Description], ParentTaskId, MilestoneId, MilestoneValue, TemplateId, Recurring, ReminderInfo, AssignmentMode, CategoryId)
	values (@Name, @Description, @ParentTaskId, @MilestoneId, @MilestoneValue, @TemplateId, @Recurring, @ReminderInfo, @AssignmentMode, @CategoryId)

	select @TaskId = SCOPE_IDENTITY()


END
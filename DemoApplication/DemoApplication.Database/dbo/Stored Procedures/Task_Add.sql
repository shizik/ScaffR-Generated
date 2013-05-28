-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Add 
	-- Add the parameters for the stored procedure here
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
	@PrincipalId CHAR(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	insert into Task 
		([Name], [Description], ParentTaskId, MilestoneId, MilestoneValue, Interval, IsBefore, TemplateId, CategoryId)
	values 
		(@Name, @Description, @ParentTaskId, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @TemplateId, @CategoryId)

	SELECT @Id = SCOPE_IDENTITY()
END
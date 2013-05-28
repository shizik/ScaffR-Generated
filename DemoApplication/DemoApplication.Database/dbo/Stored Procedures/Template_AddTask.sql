-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddTask 
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
	insert into Task 
		([Name], [Description], MilestoneId, MilestoneValue, Interval, IsBefore, CategoryId)
	values 
		(@Name, @Description, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @CategoryId)

	insert into Task 
		([Name], [Description], ParentTaskId, MilestoneId, MilestoneValue, Interval, IsBefore, TemplateId, CategoryId)
	values 
		(@Name, @Description, SCOPE_IDENTITY(), @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @TemplateId, @CategoryId)


	SELECT @Id = SCOPE_IDENTITY()
END
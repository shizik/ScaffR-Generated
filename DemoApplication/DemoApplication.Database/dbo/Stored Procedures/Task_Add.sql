-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Add 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	@ParentTaskId int,
	@MilestoneId int,
	@MilestoneValue int,
	@Interval int,
	@IsBefore bit,
	@TemplateId int,
	@PrincipalIsTeam bit,
	@ResolvedByOne bit,
	@CategoryId int,
	@PrincipalId CHAR(30)
AS
BEGIN
	INSERT INTO Task 
		([Name], [Description], ParentTaskId, MilestoneId, MilestoneValue, Interval, IsBefore, PrincipalIsTeam, Principal_Cd, ResolvedByOne, TemplateId, CategoryId)
	VALUES
		(@Name, @Description, @ParentTaskId, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @PrincipalIsTeam, @PrincipalId, @ResolvedByOne, @TemplateId, @CategoryId)

	SELECT SCOPE_IDENTITY()
END
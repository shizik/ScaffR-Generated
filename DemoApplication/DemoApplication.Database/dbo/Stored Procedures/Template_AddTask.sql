-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_AddTask 
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
	insert into Task 
		([Name], [Description], MilestoneId, MilestoneValue, Interval, IsBefore, Principal_Cd, PrincipalIsTeam, ResolvedByOne, CategoryId)
	values 
		(@Name, @Description, @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @PrincipalId, @PrincipalIsTeam, @ResolvedByOne, @CategoryId)

	insert into Task 
		([Name], [Description], ParentTaskId, MilestoneId, MilestoneValue, Interval, IsBefore, Principal_Cd, PrincipalIsTeam, ResolvedByOne, TemplateId, CategoryId)
	values 
		(@Name, @Description, SCOPE_IDENTITY(), @MilestoneId, @MilestoneValue, @Interval, @IsBefore, @PrincipalId, @PrincipalIsTeam, @ResolvedByOne, @TemplateId, @CategoryId)


	SELECT SCOPE_IDENTITY()
END
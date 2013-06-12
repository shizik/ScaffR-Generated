-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Activity_Log 
	@Action varchar(200),
	@UserId char(30),
	@AssignmentId int,
	@TaskId int,
	@TemplateId int,
	@TeamId char(30)
AS BEGIN
	insert into Activity 
		([Action], [UserId], [AssignmentId], [TaskId], [TemplateId], [TeamId])
	values 
		(@Action, @UserId, @AssignmentId, @TaskId, @TemplateId, @TeamId)
END
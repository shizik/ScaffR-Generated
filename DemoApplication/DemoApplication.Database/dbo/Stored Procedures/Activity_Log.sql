-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/28/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Activity_Log 
	@Action varchar(200),
	@UserId char(30),
	@AssignmentId int
AS BEGIN
	insert into Activity 
		([Action], [UserId], [AssignmentId])
	values 
		(@Action, @UserId, @AssignmentId)
END
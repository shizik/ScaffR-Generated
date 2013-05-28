-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_Update 
	@Id int,
	@Name varchar(50),
	@Description varchar(500),
	@MilestoneId int,
	@MilestoneValue int,
	@Interval int,
	@IsBefore bit,
	@CategoryId int,
	@PrincipalId CHAR(30)
AS
BEGIN
	UPDATE [dbo].[Task]
	   SET [Name] = @Name
		  ,[Description] = @Description
		  ,[MilestoneId] = @MilestoneId
		  ,[MilestoneValue] = @MilestoneValue
		  ,[Interval] = @Interval
		  ,[IsBefore] = @IsBefore
		  ,[CategoryId] = @CategoryId
	 WHERE TaskId = @Id
END
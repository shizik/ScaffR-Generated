-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_AddTask] 
	-- Add the parameters for the stored procedure here
	@EmployeeCd char(30), 	
	@Name varchar(50),
	@TaskId int=0,
	@description varchar(200),
	@DueDate Datetime,
	@Status varchar(50),
	@Order  varchar(50),
	@reocurring bit,
	@AssignmentId int = 0 OUTPUT	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	if @AssignmentId is null or @AssignmentId=0
		Begin 
			Insert into Assignment ([Description],DueDate,Employee_Cd,Name,[Order],Principal_Cd,[Status],TaskId,Reocurring)
			values(@description,@DueDate,@EmployeeCd,@Name,@Order,@EmployeeCd,@Status,@TaskId,@reocurring)
			set @AssignmentId=@@IDENTITY
			SELECT @AssignmentId
		End 
	Else
		Begin 
			Update Assignment set [Description]=@description,DueDate=@DueDate,Employee_Cd=@EmployeeCd,Name=@Name,[Order]=@Order,Principal_Cd=@EmployeeCd,[Status]=@Status,TaskId=@TaskId,
			Reocurring=@reocurring
			where AssignmentId=@AssignmentId
			SELECT @AssignmentId
		End 
	Return 
END
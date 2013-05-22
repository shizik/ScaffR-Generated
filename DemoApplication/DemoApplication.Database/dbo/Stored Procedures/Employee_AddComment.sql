-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_AddComment] 
	-- Add the parameters for the stored procedure here
	@EmployeeCd char(30), 
	@CompanyCd char(3),
	@Created bit,
	@Deleted bit,
	@AuthorCd char(30),
	@body varchar(1000),
	@CommentId int OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	if @CommentId is null or @CommentId=0
		Begin 
			Insert into Person_Comment (Employee_Cd,Company_Cd,Body,Created,Deleted,Author_Cd) values(@EmployeeCd,@CompanyCd,@body,@Created,@Deleted,@AuthorCd)
			set @CommentId=@@IDENTITY
			SELECT @CommentId
		End
	Else
		Begin
			Update Person_Comment set Employee_Cd=@EmployeeCd,Company_Cd=@CompanyCd,Body=@body,Created=@Created,Deleted=@Deleted,Author_Cd=@AuthorCd
			where CommentId=@CommentId
			SELECT @CommentId											  
		End 
	Return 
END
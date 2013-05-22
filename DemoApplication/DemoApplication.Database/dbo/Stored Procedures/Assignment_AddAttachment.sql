-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_AddAttachment] 
	-- Add the parameters for the stored procedure here
	@AttachmentName varchar(50),
	@mineType varchar(50),
	@AssignmentId int,	 
	@AttachmentId int OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	if  @AttachmentId IS NULL OR @AttachmentId=0
	begin
	--SET IDENTITY_INSERT [Attachment] ON
	   Insert into Attachment (Name,MineType) values(@AttachmentName,@mineType) 
	   set @AttachmentId=@@IDENTITY
	   select @AttachmentId
	   Insert into Assignment_Attachment(AssignmentId,AttachmentId,Name) values(@AssignmentId,@AttachmentId,@AttachmentName)	   
	end
	else
	begin
	   Update Attachment set Name=@AttachmentName,MineType=@mineType
	   where AttachmentId=@AttachmentId
	   select @AttachmentId	   
	end

    -- Insert statements for procedure here
	return  @AttachmentId
END
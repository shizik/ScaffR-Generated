-- =============================================
-- Author:		Rod Johnson
-- Create date: 4/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_AddAttachment] 
	-- Add the parameters for the stored procedure here
	@AttachmentName varchar(50),
	@MimeType varchar(50),
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
	   Insert into Attachment (Name,MimeType) values(@AttachmentName,@MimeType) 
	   set @AttachmentId=@@IDENTITY
	   select @AttachmentId
	   Insert into Assignment_Attachment(AssignmentId,AttachmentId,Name) values(@AssignmentId,@AttachmentId,@AttachmentName)	   
	end
	else
	begin
	   Update Attachment set Name=@AttachmentName,MimeType=@MimeType
	   where AttachmentId=@AttachmentId
	   select @AttachmentId	   
	end

    -- Insert statements for procedure here
	return  @AttachmentId
END
-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/6/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Attachment_GetById 
	-- Add the parameters for the stored procedure here
	@AttachmentId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select * from Attachment where AttachmentId = @AttachmentId

END
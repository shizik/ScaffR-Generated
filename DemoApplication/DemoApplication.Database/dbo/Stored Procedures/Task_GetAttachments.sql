-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Task_GetAttachments 
	@Id int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT A.* FROM Attachments AS A 
				INNER JOIN Task_Attachment AS TA ON A.Id = TA.AttachmentId
	WHERE TA.TaskId = @Id
END
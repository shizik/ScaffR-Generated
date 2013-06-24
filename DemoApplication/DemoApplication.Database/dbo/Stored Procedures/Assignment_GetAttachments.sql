-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/27/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Assignment_GetAttachments 
	@Id int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT A.* FROM Attachments AS A 
				INNER JOIN Assignment_Attachment AS AA ON A.Id = AA.AttachmentId
	WHERE AA.AssignmentId = @Id
END
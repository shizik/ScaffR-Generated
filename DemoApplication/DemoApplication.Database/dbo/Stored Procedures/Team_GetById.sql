-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Team_GetById 
	@Id char(30)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    --Get Team values
	SELECT * FROM Teams WHERE Id = @Id

	-- Get all team members
	EXECUTE dbo.Team_GetMembers @Id

	-- Getting all tasks for the team
	SELECT * FROM ApproverAssignments
	WHERE PrincipalId = @Id

END
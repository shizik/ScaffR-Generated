CREATE PROCEDURE [dbo].[Team_GetActivity] 
	@Id char(30)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT * FROM TeamActivity 
	WHERE TeamId = @Id
	ORDER BY [DateTime]

END
-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Team_AddMembers] 
	@Id char(30), 
	@PrincipalId char(30),
	@IsTeam bit
AS
BEGIN
	IF(@IsTeam = 0)
	BEGIN
		IF(NOT EXISTS (SELECT 1 FROM Person_Team WHERE Team_Cd = @Id AND Employee_Cd=@PrincipalId))
			INSERT INTO Person_Team (Employee_Cd,Team_Cd) values (@PrincipalId, @Id)
	END
	ELSE
		INSERT INTO Person_Team (Employee_Cd,Team_Cd)
		SELECT Employee_Cd, @Id FROM Person_Team 
		WHERE Team_Cd = @PrincipalId AND Employee_Cd 
			  NOT IN (SELECT Employee_Cd FROM Person_Team WHERE Team_Cd = @Id)
   
   	-- Get all team members
	EXECUTE dbo.Team_GetMembers @Id
END
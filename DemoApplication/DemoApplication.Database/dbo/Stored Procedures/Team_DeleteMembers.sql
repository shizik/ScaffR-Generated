-- =============================================
-- Author:		Marko Ilievski
-- Create date: 5/29/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Team_DeleteMember] 
	@Id char(30), 
	@EmployeeId char(30)
AS
BEGIN
	DELETE FROM Person_Team WHERE Employee_Cd = @EmployeeId AND Team_Cd = @Id	
END
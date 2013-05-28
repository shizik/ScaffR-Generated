-- =============================================
-- Author:		Marko Ilievski
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE Employee_GetMilestoneValue 
	@Id char(30),
	@MilestoneId int
AS
BEGIN
    SELECT TOP 1 Value FROM Person_Milestone WHERE Employee_Cd = @Id AND MilestoneId = @MilestoneId
END
-- =============================================
-- Author:		Employee_GetByCompany
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_GetByCompany] 
	-- Add the parameters for the stored procedure here
	@CompanyCd char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT        PH.Employee_Cd, PH.OriginalHire_Dt, PH.SecondaryHire_Dt, PH.Termination_Dt, PH.Termination_Type_Cd, PH.Termination_Type_Txt, PH.Active_Ind, 
                         PH.Rehire_Ind, PH.Removed_Ind
	FROM            Person_Hire AS PH RIGHT OUTER JOIN
                         Person_Main AS P ON PH.Employee_Cd = P.Employee_Cd
	WHERE        (P.Company_Cd = @CompanyCd)
    
	
END
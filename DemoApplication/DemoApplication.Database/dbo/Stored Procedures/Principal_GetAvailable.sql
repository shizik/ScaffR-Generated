-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/21/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Principal_GetAvailable] 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @Company_Cd char(3)

	select @Company_Cd = Company_Cd from Person_Main p inner join Assignment a on p.Employee_Cd = a.Employee_Cd

    select * from Principals where CompanyId = @Company_Cd

END
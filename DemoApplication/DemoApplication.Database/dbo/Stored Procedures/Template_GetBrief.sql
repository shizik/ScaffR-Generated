﻿-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/20/2013
-- Description:	
-- =============================================
CREATE PROCEDURE Template_GetBrief 
	
	--@Company_Cd char(3)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		*
	FROM TemplateBriefs 
	--Where CompanyId = @Company_Cd

END
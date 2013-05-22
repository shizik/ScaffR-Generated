-- =============================================
-- Author:		Rod Johnson
-- Create date: 
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Employee_Tasks] 
	-- Add the parameters for the stored procedure here
	@Company_Cd char(3)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	declare @People table (FirstName nchar(10),LastName nchar(10),Company nchar(10),DepartmentName nchar(10),CompletedBy nchar(10),EmployeeCode char(3))
	

    insert into @People
	select  First_Name_Txt,Last_Name_Txt,Company_Cd,Department_Cd,First_Name_Txt,Employee_Cd from Person_Main where Company_Cd = @Company_Cd

	select * from @People

	select * from Assignment inner join @People p on Assignment.Employee_Cd = p.EmployeeCode


END

--exec Employee_Tasks 1
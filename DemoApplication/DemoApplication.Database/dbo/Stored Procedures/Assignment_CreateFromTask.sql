-- =============================================
-- Author:		Rod Johnson
-- Create date: 5/5/2013
-- Description:	
-- =============================================
CREATE PROCEDURE [dbo].[Assignment_CreateFromTask] 
	-- Add the parameters for the stored procedure here
	@EmployeeCode char(30), 
	@TaskId int,
	@description varchar(50),
	@Name varchar(50),
	@AssignmentID int OUTPUT
AS
BEGIN
	
	declare @AssignID int
	declare @dueDate datetime
	declare @InnerTaskId int
	declare @milesId int
	declare @milesvalue int
	Set @AssignID=(SELECT Top 1 Assignment.AssignmentId FROM Assignment WHERE Assignment.TaskId=@TaskId and Assignment.Employee_Cd=@EmployeeCode)
	IF NOT EXISTS (SELECT Assignment.AssignmentId FROM Assignment WHERE Assignment.TaskId=@TaskId and Assignment.Employee_Cd=@EmployeeCode)
		BEGIN		
		--Get All sub tasks with parent id and add those as well 
			declare cur cursor for 
				Select Task.TaskId From Task where Task.ParentTaskId=@TaskId
				open cur
				declare @id int
				fetch next from cur into @id
					while (@@FETCH_STATUS = 0)
						begin

							IF NOT EXISTS (SELECT Assignment.AssignmentId FROM Assignment WHERE Assignment.TaskId=@id and Assignment.Employee_Cd=@EmployeeCode) 
								Begin
										-- @milesId=Task.MilestoneId,@milesvalue=Task.MilestoneValue from Task where task.TaskId=@id
									-- Exec Employee_GetMilestoneDate @milesId,@milesvalue,@EmployeeCd,@dueDate output
									set @dueDate=GETDATE()+365 --Tempraory

									Insert into Assignment ([Description],DueDate,Employee_Cd,Name,Principal_Cd,[Status],TaskId,Recurring)
									values(@description,@dueDate,@EmployeeCode,@Name,@EmployeeCode,'0',@TaskId,0)	
									set @AssignID=@@IDENTITY
											declare attCur cursor for 
											Select Task_Attachment.TaskId From Task_Attachment where Task_Attachment.TaskId=@TaskId
											open attCur
											declare @atid int
											fetch next from attCur into @atid
												while (@@FETCH_STATUS = 0)
													begin

														IF NOT EXISTS (SELECT Assignment_Attachment.AssignmentId FROM Assignment_Attachment WHERE Assignment_Attachment.AttachmentId=@atid) 
															Begin
																Insert into Assignment_Attachment (AssignmentId,AttachmentId,Name) values(@AssignID,@atid,'AttchmentDefaultName')
															End				
					
														fetch next from attCur into @atid
													end
											close attCur
											deallocate attCur
								End				
					
							fetch next from cur into @id
						end
				close cur
				deallocate cur		
			-- Apply these to user		

			Insert into Assignment ([Description],DueDate,Employee_Cd,Name,Principal_Cd,[Status],TaskId,Recurring)
			values(@description,@dueDate,@EmployeeCode,@Name,@EmployeeCode,'0',@TaskId,0)			
			set @AssignID=@@IDENTITY
			--Get All attachments with parent id and add those as well 
			declare attCur cursor for 
				Select Task_Attachment.TaskId From Task_Attachment where Task_Attachment.TaskId=@TaskId
				open attCur				
				fetch next from attCur into @atid
					while (@@FETCH_STATUS = 0)
						begin

							IF NOT EXISTS (SELECT Assignment_Attachment.AssignmentId FROM Assignment_Attachment WHERE Assignment_Attachment.AttachmentId=@atid) 
								Begin
									Insert into Assignment_Attachment (AssignmentId,AttachmentId,Name) values(@AssignID,@atid,'AttchmentDefaultName')
								End				
					
							fetch next from attCur into @atid
						end
				close attCur
				deallocate attCur

			-- add all relationships
		
		END	

		set  @AssignmentID= @AssignID
	Return 

END
namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MigrationMay14 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Employees", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Assignments", "Employee_Id", "dbo.Employees");
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Employees", new[] { "User_Id" });
            DropIndex("dbo.Assignments", new[] { "Employee_Id" });
            AddColumn("dbo.Employees", "EmployeeCode", c => c.String());
            AddColumn("dbo.Employees", "Company", c => c.String());
            AddColumn("dbo.Employees", "FirstName", c => c.String());
            AddColumn("dbo.Employees", "LastName", c => c.String());
            AddColumn("dbo.Employees", "DepartmentName", c => c.String());
            DropColumn("dbo.Employees", "Department_Id");
            DropColumn("dbo.Employees", "User_Id");
            DropTable("dbo.Assignments");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CompletionDate = c.DateTime(),
                        CompletedBy = c.String(),
                        DueDate = c.DateTime(),
                        Name = c.String(nullable: false, maxLength: 30),
                        TaskCategory = c.Int(nullable: false),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                        Employee_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Employees", "User_Id", c => c.Int());
            AddColumn("dbo.Employees", "Department_Id", c => c.Int());
            DropColumn("dbo.Employees", "DepartmentName");
            DropColumn("dbo.Employees", "LastName");
            DropColumn("dbo.Employees", "FirstName");
            DropColumn("dbo.Employees", "Company");
            DropColumn("dbo.Employees", "EmployeeCode");
            CreateIndex("dbo.Assignments", "Employee_Id");
            CreateIndex("dbo.Employees", "User_Id");
            CreateIndex("dbo.Employees", "Department_Id");
            AddForeignKey("dbo.Assignments", "Employee_Id", "dbo.Employees", "Id");
            AddForeignKey("dbo.Employees", "User_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Employees", "Department_Id", "dbo.Departments", "Id");
        }
    }
}

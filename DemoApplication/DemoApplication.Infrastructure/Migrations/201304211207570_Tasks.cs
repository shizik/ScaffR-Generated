namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Tasks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                        Department_Id = c.Int(),
                        User_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Departments", t => t.Department_Id)
                .ForeignKey("dbo.Users", t => t.User_Id)
                .Index(t => t.Department_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                        Template_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Templates", t => t.Template_Id)
                .Index(t => t.Template_Id);
            
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.Employee_Id)
                .Index(t => t.Employee_Id);
            
            CreateTable(
                "dbo.Teams",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Templates",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Description = c.String(nullable: false, maxLength: 100),
                        CreatedBy = c.String(nullable: false, maxLength: 50),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Tasks",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MilestoneDays = c.Int(nullable: false),
                        Milestone = c.Int(nullable: false),
                        Name = c.String(nullable: false, maxLength: 30),
                        TaskCategory = c.Int(nullable: false),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                        Template_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Templates", t => t.Template_Id)
                .Index(t => t.Template_Id);
            
            AddColumn("dbo.Users", "Team_Id", c => c.Int());
            AddForeignKey("dbo.Users", "Team_Id", "dbo.Teams", "Id");
            CreateIndex("dbo.Users", "Team_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Tasks", new[] { "Template_Id" });
            DropIndex("dbo.Assignments", new[] { "Employee_Id" });
            DropIndex("dbo.Departments", new[] { "Template_Id" });
            DropIndex("dbo.Employees", new[] { "User_Id" });
            DropIndex("dbo.Employees", new[] { "Department_Id" });
            DropIndex("dbo.Users", new[] { "Team_Id" });
            DropForeignKey("dbo.Tasks", "Template_Id", "dbo.Templates");
            DropForeignKey("dbo.Assignments", "Employee_Id", "dbo.Employees");
            DropForeignKey("dbo.Departments", "Template_Id", "dbo.Templates");
            DropForeignKey("dbo.Employees", "User_Id", "dbo.Users");
            DropForeignKey("dbo.Employees", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Users", "Team_Id", "dbo.Teams");
            DropColumn("dbo.Users", "Team_Id");
            DropTable("dbo.Tasks");
            DropTable("dbo.Templates");
            DropTable("dbo.Teams");
            DropTable("dbo.Assignments");
            DropTable("dbo.Departments");
            DropTable("dbo.Employees");
        }
    }
}

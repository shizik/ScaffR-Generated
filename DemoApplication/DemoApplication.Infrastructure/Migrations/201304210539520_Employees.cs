namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Employees : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Users", "Department_Id", "dbo.Departments");
            DropForeignKey("dbo.Assignments", "Employee_Id", "dbo.Users");
            DropIndex("dbo.Users", new[] { "Department_Id" });
            DropIndex("dbo.Assignments", new[] { "Employee_Id" });
            DropColumn("dbo.Users", "Title");
            DropColumn("dbo.Users", "Discriminator");
            DropColumn("dbo.Users", "Department_Id");
            DropTable("dbo.Departments");
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
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Created = c.DateTime(),
                        Updated = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Users", "Department_Id", c => c.Int());
            AddColumn("dbo.Users", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.Users", "Title", c => c.String());
            CreateIndex("dbo.Assignments", "Employee_Id");
            CreateIndex("dbo.Users", "Department_Id");
            AddForeignKey("dbo.Assignments", "Employee_Id", "dbo.Users", "Id");
            AddForeignKey("dbo.Users", "Department_Id", "dbo.Departments", "Id");
        }
    }
}

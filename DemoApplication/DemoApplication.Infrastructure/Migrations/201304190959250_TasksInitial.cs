namespace DemoApplication.Infrastructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TasksInitial : DbMigration
    {
        public override void Up()
        {
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
                .ForeignKey("dbo.Users", t => t.Employee_Id)
                .Index(t => t.Employee_Id);
            
            AddColumn("dbo.Users", "Title", c => c.String());
            AddColumn("dbo.Users", "Discriminator", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.Users", "Department_Id", c => c.Int());
            AddForeignKey("dbo.Users", "Department_Id", "dbo.Departments", "Id");
            CreateIndex("dbo.Users", "Department_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Assignments", new[] { "Employee_Id" });
            DropIndex("dbo.Users", new[] { "Department_Id" });
            DropForeignKey("dbo.Assignments", "Employee_Id", "dbo.Users");
            DropForeignKey("dbo.Users", "Department_Id", "dbo.Departments");
            DropColumn("dbo.Users", "Department_Id");
            DropColumn("dbo.Users", "Discriminator");
            DropColumn("dbo.Users", "Title");
            DropTable("dbo.Assignments");
            DropTable("dbo.Departments");
        }
    }
}

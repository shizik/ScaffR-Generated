using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using MvcApplication2.Models.Mapping;

namespace MvcApplication2.Models
{
    public partial class OnboardingContext : DbContext
    {
        //static OnboardingContext()
        //{
        //    Database.SetInitializer<OnboardingContext>(null);
        //}

        //public OnboardingContext()
        //    : base("Name=OnboardingContext")
        //{
        //}

        //public DbSet<Assignment> Assignments { get; set; }
        //public DbSet<Assignment_Attachment> Assignment_Attachment { get; set; }
        //public DbSet<Assignment_History> Assignment_History { get; set; }
        //public DbSet<Attachment> Attachments { get; set; }
        //public DbSet<Department> Departments { get; set; }
        //public DbSet<Department_Template> Department_Template { get; set; }
        //public DbSet<Milestone> Milestones { get; set; }
        //public DbSet<Person_Comment> Person_Comment { get; set; }
        //public DbSet<Person_Hire> Person_Hire { get; set; }
        //public DbSet<Person_List> Person_List { get; set; }
        //public DbSet<Person_Main> Person_Main { get; set; }
        //public DbSet<Principal> Principals { get; set; }
        //public DbSet<Tag> Tags { get; set; }
        //public DbSet<Task> Tasks { get; set; }
        //public DbSet<Task_Attachment> Task_Attachment { get; set; }
        //public DbSet<Task_Category> Task_Category { get; set; }
        //public DbSet<Task_Template> Task_Template { get; set; }
        //public DbSet<Team> Teams { get; set; }
        //public DbSet<Template> Templates { get; set; }

        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Configurations.Add(new AssignmentMap());
        //    modelBuilder.Configurations.Add(new Assignment_AttachmentMap());
        //    modelBuilder.Configurations.Add(new Assignment_HistoryMap());
        //    modelBuilder.Configurations.Add(new AttachmentMap());
        //    modelBuilder.Configurations.Add(new DepartmentMap());
        //    modelBuilder.Configurations.Add(new Department_TemplateMap());
        //    modelBuilder.Configurations.Add(new MilestoneMap());
        //    modelBuilder.Configurations.Add(new Person_CommentMap());
        //    modelBuilder.Configurations.Add(new Person_HireMap());
        //    modelBuilder.Configurations.Add(new Person_ListMap());
        //    modelBuilder.Configurations.Add(new Person_MainMap());
        //    modelBuilder.Configurations.Add(new PrincipalMap());
        //    modelBuilder.Configurations.Add(new TagMap());
        //    modelBuilder.Configurations.Add(new TaskMap());
        //    modelBuilder.Configurations.Add(new Task_AttachmentMap());
        //    modelBuilder.Configurations.Add(new Task_CategoryMap());
        //    modelBuilder.Configurations.Add(new Task_TemplateMap());
        //    modelBuilder.Configurations.Add(new TeamMap());
        //    modelBuilder.Configurations.Add(new TemplateMap());
        //}
    }
}

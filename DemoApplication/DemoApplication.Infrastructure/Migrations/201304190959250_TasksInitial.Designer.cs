// <auto-generated />
namespace DemoApplication.Infrastructure.Migrations
{
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Migrations.Infrastructure;
    using System.Resources;
    
    public sealed partial class TasksInitial : IMigrationMetadata
    {
        private readonly ResourceManager Resources = new ResourceManager(typeof(TasksInitial));
        
        string IMigrationMetadata.Id
        {
            get { return "201304190959250_TasksInitial"; }
        }
        
        string IMigrationMetadata.Source
        {
            get { return null; }
        }
        
        string IMigrationMetadata.Target
        {
            get { return Resources.GetString("Target"); }
        }
    }
}
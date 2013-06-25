namespace DemoApplication.Areas.Api.Models
{
    public abstract class TaskBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public bool PrincipalIsTeam { get; set; }
        public bool ResolvedByOne { get; set; }
        public string PrincipalId { get; set; }
        public string ApproverId { get; set; }

        public bool RequiresSignature { get; set; }
        public bool Recurring { get; set; }

        public int CategoryId { get; set; }

        protected void FillBaseProperties(TaskBase baseEntity)
        {
            Id = baseEntity.Id;
            Name = baseEntity.Name;
            Description = baseEntity.Description;

            PrincipalIsTeam = baseEntity.PrincipalIsTeam;
            ResolvedByOne = baseEntity.ResolvedByOne;
            PrincipalId = baseEntity.PrincipalId;
            ApproverId = baseEntity.ApproverId;

            RequiresSignature = baseEntity.RequiresSignature;
            Recurring = baseEntity.Recurring;

            CategoryId = baseEntity.CategoryId;
        }

        public T Copy<T>()
        {
            return (T)MemberwiseClone();
        }
    }
}
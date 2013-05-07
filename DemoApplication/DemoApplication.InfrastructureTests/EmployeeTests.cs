#region credits
// ***********************************************************************
// Assembly	: DemoApplication.InfrastructureTests
// Author	: Rod Johnson
// Created	: 03-19-2013
// 
// Last Modified By : Rod Johnson
// Last Modified On : 03-28-2013
// ***********************************************************************
#endregion
namespace DemoApplication.InfrastructureTests
{
    using Infrastructure.Services;
    using NUnit.Framework;

    [TestFixture]
    public class EmployeeTests
    {
        private OnboardingService Service;

        [TestFixtureSetUp]
        private void Setup()
        {
            Service = new OnboardingService();
        }

        [Test]
        public void ApplyTemplate_Succeeds()
        {
            Service.ApplyTemplate("2", 2);

            Assert.IsTrue(true);
        }

        [Test]
        public void CreateTemplate_Succeeds()
        {
            var template = Service.CreateTemplate("1", "testTempate", "testCategory", "123");

            Assert.IsTrue(true);
        }

        [Test]
        public void AddAttachment_Succeeds()
        {
            var attachment = Service.AddAttachment("Special", "T", 5);
            Assert.IsTrue(true);
        }

        [Test]
        public void ApplyTask_Succceeds()
        {
            var applyTask = Service.ApplyTask("1", 1, "Test description", "NewName", 0);
            Assert.IsTrue(true);
        }
    }

}

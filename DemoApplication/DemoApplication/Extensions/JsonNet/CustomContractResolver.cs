using System;
using DemoApplication.Areas.Api.MockData;
using DemoApplication.Core.Model;
using Newtonsoft.Json.Serialization;

namespace DemoApplication.Extensions.JsonNet
{
    public class CustomContractResolver : CamelCasePropertyNamesContractResolver
    {
        protected override JsonObjectContract CreateObjectContract(Type objectType)
        {
            var contract = base.CreateObjectContract(objectType);

            if (objectType != typeof(ModelRegistry.Metadata) &&
                objectType != typeof(ModelRegistry.StructuralType) &&
                objectType != typeof(ModelRegistry.DataProperty))
                contract.Properties.Add(new JsonProperty
                {
                    Readable = true,
                    ShouldSerialize = value => true,
                    PropertyName = "$type",
                    PropertyType = typeof(string),
                    Converter = ResolveContractConverter(typeof(string)),
                    ValueProvider = new EntityNameValueProvider(objectType.Name)
                });

            return contract;
        }
    }
}
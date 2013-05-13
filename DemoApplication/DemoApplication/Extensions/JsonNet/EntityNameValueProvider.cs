using Newtonsoft.Json.Serialization;

namespace DemoApplication.Extensions.JsonNet
{
    public class EntityNameValueProvider : IValueProvider
    {
        private readonly object _staticValue;

        public EntityNameValueProvider(object staticValue)
        {
            _staticValue = staticValue;
        }

        public object GetValue(object target)
        {
            return _staticValue;
        }

        public void SetValue(object target, object value)
        {

        }
    }
}
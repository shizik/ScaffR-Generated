namespace DemoApplication.Extensions.HtmlHelpers
{
    using System;
    using System.Web.Mvc;

    public class DisposableHelper : IDisposable
    {
        protected HtmlHelper _helper;

        private readonly string _closingTag;

        public DisposableHelper(HtmlHelper helper, string closingTag)
        {
            _helper = helper;
            _closingTag = closingTag;
        }

        public void Dispose()
        {
            _helper.ViewContext.Writer.Write("</" + _closingTag + ">");
        }
    }
}
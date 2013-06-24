namespace DemoApplication.Areas.Api.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Data;
    using Infrastructure.Data;

    public partial class AttachmentController
    {
        public HttpResponseMessage Delete(int id)
        {
            using (var db = new DapperDatabase())
            {
                db.Connection.Execute("Attachment_Delete",
                                      new { Id = id },
                                      commandType: CommandType.StoredProcedure);
            }

            return Request.CreateResponse(HttpStatusCode.OK, "");
        }
    }
}

using _02_BOL;
using _03_BLL;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Cors;

namespace _04_UIL.Controllers
{
    //[RoutePrefix("api/user")]

    [EnableCors("*", "*", "*")]
    public class UserController : ApiController
    {
        public HttpResponseMessage Get(string userName, string password)
        {
            UserModel user = UserManager.SelectByUserNameAndPassword(userName, password);
            if (user != null)
                return new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ObjectContent<UserModel>(user, new JsonMediaTypeFormatter())
                };

            return new HttpResponseMessage(HttpStatusCode.BadRequest);
        }


        public HttpResponseMessage Post([FromBody]UserModel value)
        {
            bool insertResult = false;


            if (ModelState.IsValid)
            {
                insertResult = UserManager.AddNewUser(value);
            }

            HttpStatusCode responseCode = insertResult ? HttpStatusCode.Created : HttpStatusCode.BadRequest;

            return new HttpResponseMessage(responseCode) { Content = new ObjectContent<bool>(insertResult, new JsonMediaTypeFormatter()) };
        }
    }
}

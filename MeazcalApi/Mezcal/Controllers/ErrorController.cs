using Microsoft.AspNetCore.Mvc;
using Mezcal.Errors;

namespace Mezcal.Controllers
{
    [Route("errors/{code}")]
   [ApiExplorerSettings(IgnoreApi =true)]
    public class ErrorController : BaseController
    {
        /// <summary>
        /// Used for returning error
        /// </summary>
        /// <param name="code"> catches code that has error</param>
        /// <returns></returns>
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}
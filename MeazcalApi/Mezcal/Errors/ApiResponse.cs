using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace Mezcal.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            ResponseCode = statusCode;
            ResponseMessage = message ?? GetDefaultMessageForStatusCode(statusCode);
        }
        public int ResponseCode { get; set; }
        public string ResponseMessage { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
          
            //var StatusCodeRes = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();
            return statusCode switch
            {
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                404 => "Resource not found",
                500 => "Errors are the path to the dark side. Errors lead to anger. Anger leads to hate.Hate leads to career change.",
                _ => null
            };
        }
    }
}

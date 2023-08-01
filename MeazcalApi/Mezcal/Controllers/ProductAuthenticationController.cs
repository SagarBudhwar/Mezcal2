using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace Mezcal.Controllers
{
    public class ProductAuthenticationController : BaseController
    {
        private readonly IAuthenticationRepository _productAuthRepository;
        public ProductAuthenticationController(IAuthenticationRepository productAuthRepository)
        {
            _productAuthRepository = productAuthRepository;
        }
        [HttpPost]

        public async Task<IActionResult> VerifyProduct(ProductAuth productAuth)
        {
            //HttpResponse<ProductAuthResponse> res = new HttpResponse<ProductAuthResponse>();
            try
            {
                var uri = new Uri(productAuth.UID);

                var query = HttpUtility.ParseQueryString(uri.Query);

                productAuth.UID = query.Get("uid");

                string decryptedQRCode = CommonUtils.DecryptQRCode(productAuth.UID);
                ProductAuthResponse result = null;
                if (decryptedQRCode != "Invalid")
                {
                    string prefix = decryptedQRCode.Substring(0, 1);
                    if (prefix == "M")
                    {
                        productAuth.Prefix = "B";
                    }
                    else
                        productAuth.Prefix = prefix;

                    productAuth.SeqNo = Convert.ToString(Convert.ToInt32(decryptedQRCode.Substring(3)));
                    result = await _productAuthRepository.VerifyProduct(productAuth);
                    //if (prefix == "MO") ///checking the prefix 
                    //{
                    //    productAuth.SeqNo = Convert.ToString(Convert.ToInt32(decryptedQRCode.Substring(3)));
                    //    result = await _productAuthRepository.VerifyProduct(productAuth);


                    //}
                    if (result.Status == 1)
                    {
                        if (productAuth.ScanFrom == "Web") 
                        {
                            return Ok(new { ResponseData = result, ResponseMessage = "para ver los detalles del producto, haga clic en el enlace de la aplicación a continuación", ResponseCode = HttpStatusCode.OK });
                        }
                        else
                        {
                            return Ok(new { ResponseData = result, ResponseMessage = "gracias por comprar un producto original", ResponseCode = HttpStatusCode.OK });
                        }
                        //  return Ok(new { ResponseData = result, ResponseMessage = "Thanks for buying Genuine product", ResponseCode = HttpStatusCode.OK });
                    }
                    else if (result.Status == 2)
                    {

                        return Ok(new { ResponseData = result, ResponseMessage = "es posible que el producto comprado  sea falsificado", ResponseCode = 400 });

                        // return Ok(new { ResponseData = result, ResponseMessage = "Seems like the product you have bought may be counterfeited or fake.", ResponseCode = 400});
                    }
                    else if (result.Status == 3)
                    {
                        return Ok(new { ResponseData = result, ResponseMessage = "usted ha comprado un producto dañado", ResponseCode = 401 });
                        //return Ok(new { ResponseData = result, ResponseMessage = " You have bought a damaged product", ResponseCode = 401 });
                    }
                    else if (result.Status == 4)
                    {
                        return Ok(new { ResponseData = result, ResponseMessage = "usted ha comprado un producto robado", ResponseCode = 402 });
                        //return Ok(new { ResponseData = result, ResponseMessage = "You have bought a Stolen Product", ResponseCode = 402 });
                    }
                    else if (result.Status == 5)
                    {
                        return Ok(new { ResponseData = result, ResponseMessage = "Producto Pendiente De Ser VALIDADO", ResponseCode = 403 });
                        //return Ok(new { ResponseData = result, ResponseMessage = "You have bought a Stolen Product", ResponseCode = 402 });
                    }
                }
                else
                {
                    productAuth.SeqNo = "-1";

                    result = await _productAuthRepository.VerifyProduct(productAuth);

                    //return Ok(new { ResponseData = result, ResponseMessage = "Seems like the product you have bought may be counterfeited or fake.", ResponseCode = "400" });
                    return Ok(new { ResponseData = result, ResponseMessage = "es posible que el producto comprado  sea falsificado", ResponseCode = 400 });
                }
                //return Ok(new { ResponseData = new object { }, ResponseMessage = "Not Mapped", ResponseCode = "400" }); 
                return Ok(new { ResponseData = new object { }, ResponseMessage = "producto falsificado", ResponseCode = "400" });
            }
            
            catch(Exception ex)
            {
                //ProductAuthResponse result = null;
                var result = await _productAuthRepository.VerifyFakeProduct(productAuth);
                ProductAuth obj = new ProductAuth();
                obj.VerificationId = result.VerificationID;
                return Ok(new { ResponseData = obj, ResponseMessage = "es posible que el producto comprado  sea falsificado", ResponseCode = 400 });
            }



        }
        [HttpPost]
        public async Task<IActionResult> UpdateFeedback(Productfeedback productAuth)
        {
          
                if (ModelState.IsValid)
                {
                    var dbres = await _productAuthRepository.UpdateFeedback(productAuth);
                if (dbres.ResponseCode == "200")
                {
                    return Ok(new { ResponseData = dbres, ResponseMessage = dbres.ResponseMessage, ResponseCode = HttpStatusCode.OK });

                }
                else {
                    return Ok(new { ResponseData = new object { }, ResponseMessage = dbres.ResponseMessage, ResponseCode = 400 });

                }
                   // return dbres;
                }
                else
                {
               
                return Ok(new { ResponseData = new object { }, ResponseMessage = "error", ResponseCode = 500 });
               // return new FeedbackResponse { ResponseCode = "500", ResponseMessage = "some error" };
                }
        }
        [HttpGet]
        public async Task<IActionResult> GetScanLogData(int UserID)
        {
            var response = await _productAuthRepository.GetScanLogData(UserID);
            if (response.Count() > 0)
            {
                //Data found successfully
                return Ok(new { ResponseData = response, ResponseMessage = "Datos encontrados con éxito", ResponseCode = HttpStatusCode.OK });
            }
            else
            {
                //Data not found
                return Ok(new { ResponseData = response, ResponseMessage = "Datos no encontrados", ResponseCode = HttpStatusCode.BadRequest });
            }
        }
    }
}

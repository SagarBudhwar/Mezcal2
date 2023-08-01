using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Mezcal.Dtos;
using System.Text;
using Mezcal.Models;
using System.Data;
using System.Drawing;
using System.Configuration;
using System.Web;
using Mezcal.IRepository;
using Microsoft.AspNetCore.Hosting;


namespace Mezcal.Controllers
{
    public class ProductController : BaseController
    {
        private readonly IProductRepository _product;
        private readonly IConfiguration _configuration;
        private IHostingEnvironment _env ;
        private readonly CommonUtils _common;
        public ProductController(IProductRepository product, IConfiguration configuration, IHostingEnvironment env)
        {
            _product = product;
            _configuration = configuration;
            _common = new CommonUtils();
            _env = env;
        }
        /// <summary>
        /// This api is used to get brand for dropdown list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetBrandListForDDL()
        {
            var response = await _product.GetBrandListForDDL();
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }
        /// <summary>
        /// this api is used to get category data for dropdown list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetCategoryListForDDL()
        {
            var response = await _product.GetCategoryListForDDL();
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }
        /// <summary>
        /// This api is use to get type data for dropdown list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetTypeListForDDL()
        {
            var response = await _product.GetTypeListForDDL();
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }

        /// <summary>
        /// This api is used to get species data for dropdown list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetSpeciesListForDDL()
        {
            var response = await _product.GetSpeciesListForDDL();
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }
        /// <summary>
        /// This api is used to get the state data for dropdown list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult> GetStateListForDDL()
        {
            var response = await _product.GetStateListForDDL();
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }
        /// <summary>
        /// This Api is used to get the product data for grid
        /// </summary>
        [HttpPost]
        public async Task<ActionResult> GetProductList(CommonDto cdo)
        {
            var response = await _product.GetProductList(cdo);

            //response.Where()
            //for (int i = 0; i < response.Count(); i++)
            //{
            //    string[] imageName = response[i].ImagePath.Split("ProductImage/");
            //    byte[] imageArray = System.IO.File.ReadAllBytes(@"wwwroot/ProductImage/"+imageName[1]);
            //    string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            //    response[i].Base64 = base64ImageRepresentation;
            //}
            if (response.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = "No Data Found", ResponseData = new { } });
            }
        }
        /// <summary>
        /// this api is used to add product
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductDto request)
        {
            //string path = _common.Base64ToFile(request.ImageBase64,"jpg");

            //var rootFolder = this._env.WebRootPath;
            //rootFolder = Path.Combine(rootFolder, "ProductImage");
            //var fileName = Guid.NewGuid().ToString() + "_" + request.ProductName;
            //var filePath = Path.Combine(rootFolder, fileName);
            //using (var fileStream = new FileStream(filePath, FileMode.Create))
            //{
            //    await file.CopyToAsync(fileStream);
            //}
            string path = _common.Base64ToFile(request.ImageBase64, "jpg");

            string baseHref = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
            request.ImagePath = baseHref + "/" + path;
            string finalPath = request.ImagePath.Replace("/wwwroot", "");
            finalPath = finalPath.Replace("\\", "/");
            request.ImagePath = finalPath;

            var response = await _product.AddProduct(request);
            if (response.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = response.ResponseCode, ResponseMessage = response.ResponseMessage, ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = response.ResponseMessage, ResponseData = new { } });
            }
        }
        [HttpPost]
        public async Task<ActionResult> UpdateProduct(ProductDto request)
        {
            if (request.ImageBase64 != "" && request.ImageBase64 != null)
            {
                string path = _common.Base64ToFile(request.ImageBase64, "jpg");
                string baseHref = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
                request.ImagePath = baseHref + "/" + path;
                string finalPath = request.ImagePath.Replace("/wwwroot", "");
                finalPath = finalPath.Replace("\\", "/");
                request.ImagePath = finalPath;
                string[] splittedString = request.PreviousImagePath.Split("ProductImage/");
                if (splittedString.Length == 2)
                {
                    string imgPath = Path.Combine(@"wwwroot/ProductImage", splittedString[1]);
                    FileInfo File = new FileInfo(imgPath);
                    if (File.Exists)
                    {
                        File.Delete();
                    }
                }
            }
            else
            {
                request.ImagePath = null;
            }
            var response = await _product.UpdateProduct(request);
            if (response.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = response.ResponseCode, ResponseMessage = response.ResponseMessage, ResponseData = response });
            }
            else
            {
                return Ok(new { ResponseCode = 400, ResponseMessage = response.ResponseMessage, ResponseData = new { } });
            }
        }
    }
}

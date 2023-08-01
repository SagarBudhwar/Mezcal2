using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Mezcal.Helpers;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Net;
using Mezcals.IRepository;

namespace Mezcal.Controllers
{
    public class CommonController : BaseController
    {
        private readonly ICommonRepository _commonRepository;
        private readonly IConfiguration _configuration;

        public CommonController(ICommonRepository commonRepository, IConfiguration configuration)
        {
            _commonRepository = commonRepository;
            _configuration = configuration;
        }
        /// <summary>
        /// This is used to Add Brand
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddBrandMaster(BrandMaster brand)
        {
            var result = await _commonRepository.AddBrandMaster(brand);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        /// <summary>
        /// This is used to Update the brand
        /// </summary>
        /// <param name="brand"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateBrandMaster(BrandMaster brand)
        {
            var result = await _commonRepository.UpdateBrandMaster(brand);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        /// <summary>
        /// Add Type Master
        /// </summary>
        /// <param name="brand"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> AddTypeMaster(TypeMaster type)
        {
            var result = await _commonRepository.AddTypeMaster(type);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        /// <summary>
        /// Update Type Master
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateTypeMaster(TypeMaster type)
        {
            var result = await _commonRepository.UpdateTypeMaster(type);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        /// <summary>
        /// Add Type
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetTypeMasterList(CommonDto type)
        {
            var result = await _commonRepository.GetTypeMasterList(type);
            if (result.Count() > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Available", ResponseData = result });
            }
            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Data Not Available", ResponseData = new object() });
            }
        }
        /// <summary>
        /// Add Species Master
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> AddSpeciesMaster(SpeciesMaster species)
        {
            var result = await _commonRepository.AddSpeciesMaster(species);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        /// <summary>
        /// update species master
        /// </summary>
        /// <param name="species"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateSpeciesMaster(SpeciesMaster species)
        {
            var result = await _commonRepository.UpdateSpeciesMaster(species);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        [HttpPost]
        public async Task<IActionResult> GetStateMasterList(CommonDto species)
        {
            var result = await _commonRepository.GetStateMasterList(species);
            if (result.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = result });
            }
            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Data Not Found", ResponseData = new object() });
            }
        }
        /// <summary>
        /// Get State List
        //// </summary>
        //// <param name = "state" ></ param >
        [HttpPost]
        public async Task<IActionResult> GetSpeciesMasterList(CommonDto species)
        {
            var result = await _commonRepository.GetSpeciesMasterList(species);
            if (result.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = result });
            }
            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Data Not Found", ResponseData = new object() });
            }
        }
        /// <summary>
        /// Add State Master
        /// </summary>
        ///
        [HttpPost]
        public async Task<IActionResult> AddStateMaster(StateMaster state)
        {
            var result = await _commonRepository.AddStateMaster(state);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateStateMaster(StateMaster state)
        {
            var result = await _commonRepository.UpdateStateMaster(state);
            if (result.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
            else
            {
                return Ok(new { ResponseCode = result.ResponseCode, ResponseMessage = result.ResponseMessage });
            }
        }
        [HttpPost]
        public async Task<IActionResult> GetBrandList(CommonDto common)
        {
            var result = await _commonRepository.GetBrandList(common);
            if (result.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Data Found", ResponseData = result });
            }
            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Data Not Found", ResponseData = new object() });
            }
        }
        [HttpPost]
        public async Task<IActionResult> GetCategoryList(CommonDto commonUtils)
        {
            var categorylist = await _commonRepository.GetCategoryList(commonUtils);

            if (categorylist.Count() > 0)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = categorylist });
            }
            else
            {
                return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = categorylist });
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddProductCategory(CategoryMaster category)
        {
            var categorylist = await _commonRepository.AddProductCategory(category);

            if (categorylist.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = categorylist.ResponseCode, ResponseMessage = categorylist.ResponseMessage, ResponseData = categorylist });
            }
            else
            {
                return Ok(new { ResponseCode = categorylist.ResponseCode, ResponseMessage = categorylist.ResponseMessage, ResponseData = categorylist });
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateProductCategory(CategoryMaster category)
        {
            var categorylist = await _commonRepository.UpdateProductCategory(category);

            if (categorylist.ResponseCode == "200")
            {
                return Ok(new { ResponseCode = categorylist.ResponseCode, ResponseMessage = categorylist.ResponseMessage, ResponseData = categorylist });
            }
            else
            {
                return Ok(new { ResponseCode = categorylist.ResponseCode, ResponseMessage = categorylist.ResponseMessage, ResponseData = categorylist });
            }
        }
        //[HttpPost]
        //public async Task<IActionResult> AddTypeMaster(TypeMaster type)
        //{
        //    var categorylist = await _commonRepository.AddTypeMaster(type);

        //    if (categorylist.ResponseCode == "200")
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = categorylist });
        //    }
        //    else
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = categorylist });
        //    }
        //}
        //[HttpPost]
        //public async Task<IActionResult> UpdateTypeMaster(TypeMaster category)
        //{
        //    var categorylist = await _commonRepository.UpdateProductCategory(category);

        //    if (categorylist.ResponseCode == "200")
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = categorylist });
        //    }
        //    else
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = categorylist });
        //    }
        //}
        //[HttpPost]
        //public async Task<IActionResult> UpdateProductCategory(CategoryMaster category)
        //{
        //    var categorylist = await _commonRepository.UpdateProductCategory(category);

        //    if (categorylist.ResponseCode == "200")
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = categorylist });
        //    }
        //    else
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = categorylist });
        //    }
        //}
        //[HttpPost]
        //public async Task<IActionResult> UpdateProductCategory(CategoryMaster category)
        //{
        //    var categorylist = await _commonRepository.UpdateProductCategory(category);

        //    if (categorylist.ResponseCode == "200")
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = categorylist });
        //    }
        //    else
        //    {
        //        return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "Data Not Found", ResponseData = categorylist });
        //    }
        //}
    }
    }


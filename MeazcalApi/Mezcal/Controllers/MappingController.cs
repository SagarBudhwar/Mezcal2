using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Mezcal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Mezcals.IRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace Mezcal.Controllers
{

    [Authorize]
    public class MappingController : BaseController
    {
        private readonly IMappingRepository _mappingRepository;
        private readonly IStolenRepository _stolenRepository;
        public MappingController(IMappingRepository mappingRepository, IStolenRepository stolenRepository)
        {
           _mappingRepository = mappingRepository;
            _stolenRepository = stolenRepository;
        }
       
        [HttpPost]
        public async Task<IActionResult> SaveMapping(MappingDto mappingDto)
        {

            CheckNumbers check = new CheckNumbers();

            List<HologramStcokList> checkStockList = await _mappingRepository.GetHologramStcokSummary(mappingDto.Prefix);
            int checkStock = check.CheckRangeData(checkStockList, mappingDto.FromNumber, mappingDto.ToNumber);

            if (checkStock == 1)
            {
                List<CheckHologramMapping> checkMappinglist = await _mappingRepository.CheckHologramMapping(mappingDto.Prefix,mappingDto.FromNumber, mappingDto.ToNumber);
                int checkMapping = check.CheckRangeData(checkMappinglist, mappingDto.FromNumber, mappingDto.ToNumber);

                if (checkMapping == 0)
                {
                    List<CheckHologramMapping> checkDamage = await _mappingRepository.CheckHologramDamage(mappingDto.Prefix,mappingDto.FromNumber, mappingDto.ToNumber);

                    if (checkDamage.Count == 0)
                    {

                        var checkStolen = await _stolenRepository.CheckHologramStolen(mappingDto.Prefix,mappingDto.FromNumber, mappingDto.ToNumber);

                        if (checkStolen.Count == 0) 
                        {

                            var result = await _mappingRepository.SaveMapping(mappingDto);
                            if (result.RespCd == 1)
                            {
                                return Ok(new { ResponseData = result, ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.OK });
                            }
                            else
                            {
                                return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                            }


                        }

                        else
                        {

                            return Ok(new { ResponseData = new object(), ResponseMessage = "Ya existen series en robado.", ResponseCode = HttpStatusCode.NotFound });
                            //return Ok(new { ResponseData = new object(), ResponseMessage = "Series already exist in stolen.", ResponseCode = HttpStatusCode.NotFound });
                        }


                    }
                    else
                    {

                        return Ok(new { ResponseData = new object(), ResponseMessage = "Ya existen series en daños", ResponseCode = HttpStatusCode.NotFound });
                        //return Ok(new { ResponseData = new object(), ResponseMessage = "Series already exist in damage.", ResponseCode = HttpStatusCode.NotFound });
                    }
                }
                else
                {
                    //return Ok(new { ResponseData = new object(), ResponseMessage = "Already In Mapped", ResponseCode = HttpStatusCode.NotFound });
                    return Ok(new { ResponseData = new object(), ResponseMessage = "Ya en mapeado", ResponseCode = HttpStatusCode.NotFound });
                }
            }
            else
            {
                //return Ok(new { ResponseData = new object(), ResponseMessage = "Not in Stcok", ResponseCode = HttpStatusCode.NotFound });
                return Ok(new { ResponseData = new object(), ResponseMessage = "No disponible en stock", ResponseCode = HttpStatusCode.NotFound });
            }

        }


        /// <summary>
        /// Get Mapping Numbers list
        /// </summary>
        /// <param name="commonUtils"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetMappingListForGrid(CommonUtilsReport commonUtils)
        {


            var resposelist = await _mappingRepository.GetMappingListForGrid(commonUtils);

            if (resposelist != null && resposelist.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Record Found", ResponseData = resposelist });
            }

            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Record Not Found", ResponseData = new object() });
            }
        }



        /// <summary>
        /// Get Mapping Numbers list
        /// </summary>
        /// <param name="commonUtils"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetDeMappingListForGrid(CommonUtilsReport commonUtils)
        {


            var resposelist = await _mappingRepository.GetDeMappingListForGrid(commonUtils);

            if (resposelist != null && resposelist.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Record Found", ResponseData = resposelist });
            }

            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Record Not Found", ResponseData = new object() });
            }
        }


        /// <summary>
        /// Get product list for dropdown List.
        /// </summary>
        /// <returns>List</returns>
        [HttpGet]
        public async Task<IActionResult> GetProductsListForDdl()
        {

            //  CR-132   Remove this useless assignment to local variable 'ProductsList'.
            var ProductsList = await _mappingRepository.GetProductsListForDdl();
            if (ProductsList.Count > 0)
            {
                return Ok(new { ResponseData = ProductsList, ResponseMessage = "Record Found !!", ResponseCode = HttpStatusCode.OK });

            }
            else
            {
                return Ok(new { ResponseData = new object(), ResponseMessage = "No Record Found !!", ResponseCode = HttpStatusCode.NotFound });
            }
        }

        /// <summary>
        /// Get Availabel HologramStock
        /// </summary>
        /// <param name="commonUtils"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetAvailabelHologramStock(CommonUtils commonUtils)
        {

            var availabeList = await _mappingRepository.GetAvailabelHologramStock(commonUtils);

            if (availabeList != null && availabeList.Count > 0)
            {
                return Ok(new { ResponseCode = 200, ResponseMessage = "Record Found", ResponseData = availabeList });
            }

            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Record Not Found", ResponseData = new object() });
            }
        }


        /// <summary>
        /// Get Product List for grid for select a product for mapping.
        /// </summary>
        /// <param name="request">Used For Pagination.</param>
        /// <returns>List</returns>
        [HttpPost]
        public async Task<IActionResult> GetProductListForSelect(CommonUtils request)
        {
            if (request is null)
            {
                throw new ArgumentNullException(nameof(request));
            }
            var productList = await _mappingRepository.GetProductListForSelect(request);
            if (productList != null && productList.Count > 0)
                return Ok(new { ResponseCode = 200, ResponseMessage = "Record Found", ResponseData = productList });

            else
            {
                return Ok(new { ResponseCode = 404, ResponseMessage = "Record Not Found", ResponseData = new object() });
            }
        }

        /// <summary>
        /// Used for Demap Numbers 
        /// </summary>
        /// <param name="mappingDto"></param>
        /// <returns></returns>

        [HttpPost]
        public async Task<IActionResult> DeMapping(MappingDto mappingDto)
        {

            List<CheckHologramMapping> checkDamage = await _mappingRepository.CheckHologramDamage(mappingDto.Prefix,mappingDto.FromNumber, mappingDto.ToNumber);

            if (checkDamage.Count == 0)
            {
                var checkStolen = await _stolenRepository.CheckHologramStolen(mappingDto.Prefix, mappingDto.FromNumber, mappingDto.ToNumber);

                if (checkStolen.Count == 0)
                {

                    var result = await _mappingRepository.EditHologramMapping(mappingDto);
                    if (result.RespCd == 1)
                    {
                        return Ok(new { ResponseData = result, ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.OK });
                    }
                    else
                    {
                        return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                    }
                }
                else
                {

                    return Ok(new { ResponseData = new object(), ResponseMessage = "Ya existen series en robado.", ResponseCode = HttpStatusCode.NotFound });
                    //return Ok(new { ResponseData = new object(), ResponseMessage = "Series already exist in stolen.", ResponseCode = HttpStatusCode.NotFound });
                }

            }
            else
            {
                //return Ok(new { ResponseData = new object(), ResponseMessage = "Label not demapped successfully", ResponseCode = HttpStatusCode.NotFound });
                return Ok(new { ResponseData = new object(), ResponseMessage = "La etiqueta no se desasignó correctamente", ResponseCode = HttpStatusCode.NotFound });
            }

        }



    }
}

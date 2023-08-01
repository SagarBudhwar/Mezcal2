using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Mezcal.Controllers
{

    [Authorize]
    public class HologramStockController : BaseController
    {
        private readonly IHologramStockRepository _hologramStockRepository;
        public HologramStockController(IHologramStockRepository hologramStockRepository)
        {
            _hologramStockRepository = hologramStockRepository;
        }


        [HttpPost]
        public async Task<IActionResult> GetAllHologramStock(CommonUtils commonUtils)
        {
          
                List<HologramStock> ScList = new List<HologramStock>();
                ScList = await _hologramStockRepository.GetAllStock(commonUtils);

                if (ScList.Count > 0)
                {
                    return Ok(new { ResponseData = ScList, ResponseMessage = "Record Found !!", ResponseCode = HttpStatusCode.OK });
                }
                else
                {
                    return Ok(new { ResponseData = new object(), ResponseMessage = "No Record Found !!", ResponseCode = HttpStatusCode.NotFound });
                }
           
        }

        [HttpGet]
        public async Task<IActionResult> GetHologramStockLastColumnData(string Prefix)
        {
            
                var result = await _hologramStockRepository.GetHologramStockLastInsertedData(Prefix);
                if (result != null)
                {
                    return Ok(new { ResponseData = result, ResponseMessage = "Record Found !!", ResponseCode = HttpStatusCode.OK });
                }
                else
                {
                    return Ok(new { ResponseData = new object(), ResponseMessage = "No Record Found !!", ResponseCode = HttpStatusCode.NotFound });
                }
            

        }

        /// <summary>
        /// This method use to create stock in application
        /// </summary>
        /// <param name="stock"></param>
        /// <returns code="200">Message of action</returns>
        [HttpPost]
        public async Task<IActionResult> CreateStock(HologramStockDto stock)
        {
            try
            {
                if (stock is null)
                {
                    throw new ArgumentNullException(nameof(stock));
                }
                else
                {
                    var result = await _hologramStockRepository.SaveStock(stock);

                    if (result.RespCd == 200)
                    {
                        return Ok(new { ResponseData = result, ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.OK });
                    }
                    else
                    {
                        return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        [HttpPost]
        public async Task<IActionResult> StockUpdate(HologramStockDto stock)
        {
            try
            {
                var result = await _hologramStockRepository.UpdateStock(stock);
                if (result.RespCd == 200)
                {
                    return Ok(new { ResponseData = result, ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.OK });
                }
                else
                {
                    return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CheckFromNumberToNumberExist(HologramStockDto stock)
        {
            try
            {
                var result = await _hologramStockRepository.IsFromNumberToNumberExistInHologramMapping(stock);
                if (result.RespCd == 200)
                {
                    return Ok(new { ResponseData = result, ResponseMessage = "Record Found !!", ResponseCode = HttpStatusCode.OK });
                }
                else
                {
                    return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



    }
}

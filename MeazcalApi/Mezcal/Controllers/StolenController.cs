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
    public class StolenController : BaseController
    {
        private readonly IStolenRepository _stolenRepository; 
        private readonly IMappingRepository _mappingRepository;
        public StolenController(IStolenRepository  stolenRepository, IMappingRepository mappingRepository)
        {
            _stolenRepository = stolenRepository;
            _mappingRepository = mappingRepository;
        }


        [HttpPost]
        public async Task<IActionResult> GetAllStolenStock(CommonUtilsReport commonUtils)
        {
          
                List<Stock> GetDamages = new List<Stock>();
                GetDamages = await _stolenRepository.GetAllStolen(commonUtils);

                if (GetDamages.Count > 0)
                {
                    return Ok(new { ResponseData = GetDamages, ResponseMessage = "Record Found !!", ResponseCode = HttpStatusCode.OK });
                }
                else
                {
                    return Ok(new { ResponseData = new object(), ResponseMessage = "No Record Found !!", ResponseCode = HttpStatusCode.NotFound });
                }
          
        }

        [HttpPost]
        public async Task<IActionResult> SaveStolen(StockDto stock)
        {

                if (stock is null)
                {
                    throw new ArgumentNullException(nameof(stock));
                }
                else
                {

                    var result = await _stolenRepository.IsFromNumberAndToNumberExist(stock.Prefix,stock.FromNumber, stock.ToNumber);
                    if (result.RespCd == 200)
                    {
                        CheckNumbers check = new CheckNumbers();
                        var checkStockList = await _stolenRepository.CheckStock(stock.Prefix);
                        if (checkStockList != null)
                        {
                            int checkStock = check.CheckRangeData(checkStockList, stock.FromNumber, stock.ToNumber);
                            if (checkStock == 1)
                            {

                            List<CheckHologramMapping> checkDamage = await _mappingRepository.CheckHologramDamage(stock.Prefix,stock.FromNumber, stock.ToNumber);

                            if (checkDamage.Count == 0)
                            {

                                var saveStolen = await _stolenRepository.SaveStolen(stock);

                                if (saveStolen.RespCd == 200)
                                {
                                    return Ok(new { ResponseData = saveStolen, ResponseMessage = saveStolen.RespMsg, ResponseCode = HttpStatusCode.OK });
                                }
                                else
                                {
                                    return Ok(new { ResponseData = new object(), ResponseMessage = saveStolen.RespMsg, ResponseCode = HttpStatusCode.NotFound });
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
                            //return Ok(new { ResponseData = new object(), ResponseMessage = "From number and to number does not exist in stock", ResponseCode = HttpStatusCode.NotFound });
                            return Ok(new { ResponseData = new object(), ResponseMessage = "Desde número y hasta número no existe en stock", ResponseCode = HttpStatusCode.NotFound });
                        }
                        }
                        else
                        {
                        //return Ok(new { ResponseData = new object(), ResponseMessage = "Series not issued yet", ResponseCode = HttpStatusCode.NotFound });
                        return Ok(new { ResponseData = new object(), ResponseMessage = "Serie aún no publicada", ResponseCode = HttpStatusCode.NotFound });
                    }
                    }
                    else
                    {
                        return Ok(new { ResponseData = new object(), ResponseMessage = result.RespMsg, ResponseCode = HttpStatusCode.NotFound });
                    }
                }
          
        }
    }
}

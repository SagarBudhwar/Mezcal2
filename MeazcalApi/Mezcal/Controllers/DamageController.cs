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
    public class DamageController : BaseController
    {
        private readonly IDamageRepository _damageRepository;
        private readonly IStolenRepository _stolenRepository;
        public DamageController(IDamageRepository damageRepository, IStolenRepository stolenRepository)
        {
            _damageRepository = damageRepository; 
            _stolenRepository = stolenRepository;
        }

        [HttpPost]
        public async Task<IActionResult> GetAllDamageStock(CommonUtilsReport commonUtils)
        {
           
                List<Stock> GetDamages = new List<Stock>();
                GetDamages = await _damageRepository.GetAllDamage(commonUtils);

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
        public async Task<IActionResult> SaveDamage(StockDto stock)
        {
         
                if (stock is null)
                {
                    throw new ArgumentNullException(nameof(stock));
                }
                else
                {

                    var result = await _damageRepository.IsFromNumberAndToNumberExist(stock.Prefix,stock.FromNumber, stock.ToNumber);
                    if (result.RespCd == 200)
                    {
                        CheckNumbers check = new CheckNumbers();
                        var checkStockList = await _damageRepository.CheckStock(stock.Prefix);
                        if (checkStockList != null)
                        {
                            int checkStock = check.CheckRangeData(checkStockList, stock.FromNumber, stock.ToNumber);
                            if (checkStock == 1)
                            {

                                var checkStolen = await _stolenRepository.CheckHologramStolen(stock.Prefix,stock.FromNumber, stock.ToNumber);

                             if (checkStolen.Count == 0)
                              {

                                    var saveDamage = await _damageRepository.SaveDamage(stock);

                                if (saveDamage.RespCd == 200)
                                {
                                    return Ok(new { ResponseData = saveDamage, ResponseMessage = saveDamage.RespMsg, ResponseCode = HttpStatusCode.OK });
                                }
                                else
                                {
                                    return Ok(new { ResponseData = new object(), ResponseMessage = saveDamage.RespMsg, ResponseCode = HttpStatusCode.NotFound });
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

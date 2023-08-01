using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IDamageRepository
    {
            Task<List<Stock>> GetAllDamage(CommonUtilsReport commonUtils);
            Task<CommonResponse> SaveDamage(StockDto stock);
            Task<CommonResponse> IsFromNumberAndToNumberExist(string Prefix,long fromNumber,long toNumber);
            Task<List<StockDto>> CheckStock(string Prefix);
            Task<List<StockDto>> CheckHologramDamage(long FromNumber, long ToNumber);
     }
}

using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IStolenRepository
    {
        Task<List<Stock>> GetAllStolen(CommonUtilsReport commonUtils);
        Task<CommonResponse> SaveStolen(StockDto stock);
        Task<CommonResponse> IsFromNumberAndToNumberExist(string Prefix,long fromNumber, long toNumber);
        Task<List<StockDto>> CheckStock(string Prefix);
        Task<List<StockDto>> CheckHologramStolen(string Prefix,long FromNumber, long ToNumber);
    }
}

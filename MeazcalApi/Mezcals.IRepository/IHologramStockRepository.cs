using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IHologramStockRepository
    {
        Task<List<HologramStock>> GetAllStock(CommonUtils commonUtils);
        Task<CommonResponse> SaveStock(HologramStockDto stock);
        Task<CommonResponse> UpdateStock(HologramStockDto stock);
        Task<CommonResponse> GetHologramStockLastInsertedData(string Prefix);
        Task<CommonResponse> IsFromNumberToNumberExistInHologramMapping(HologramStockDto stock);
    }
}

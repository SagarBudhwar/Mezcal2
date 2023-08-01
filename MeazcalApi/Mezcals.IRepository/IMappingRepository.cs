using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IMappingRepository
    {
        Task<List<MappingList>> GetMappingListForGrid(CommonUtilsReport commonUtils);
        Task<List<DeMappingList>> GetDeMappingListForGrid(CommonUtilsReport commonUtils);
        Task<CommonResponse> SaveMapping(MappingDto mappingDto);
        Task<CommonResponse> EditHologramMapping(MappingDto mappingDto);
        Task<List<HologramStcokList>> GetHologramStcokSummary(string Prefix);
        Task<List<CheckHologramMapping>> CheckHologramMapping(string Prefix,long FromNumber, long ToNumber);

        Task<List<ProductsListForDdl>> GetProductsListForDdl();

        Task<List<HologramStcokList>> GetAvailabelHologramStock(CommonUtils commonUtils);

        Task<List<ProductListForMapping>> GetProductListForSelect(CommonUtils UP);

        Task<List<CheckHologramMapping>> CheckHologramDamage(string Prefix,long FromNumber, long ToNumber);

    }
}

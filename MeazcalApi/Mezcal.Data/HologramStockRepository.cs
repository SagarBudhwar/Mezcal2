using Dapper;
using Microsoft.Extensions.Options;
using Mezcal.Dtos;
using Mezcal.Helpers;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mezcal.Data;
using Mezcal.Helper;
using Mezcal.IRepository;

namespace Mezcal.Data
{
    public class HologramStockRepository : IHologramStockRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public HologramStockRepository(IOptions<DbConnection> appSettings)
        {
            _appSettings = appSettings;
        }
        

        public async Task<List<HologramStock>> GetAllStock(CommonUtils commonUtils)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "sp_GetHologramStock";

                var Schmlist =await con.QueryMultipleAsync(sql, new
                {
                    pageNumber = commonUtils.PageNumber,
                    pageSize = commonUtils.PageSize,
                    sortOrder = commonUtils.SortOrder,
                    search = commonUtils.Search,
                    sortBy = commonUtils.SortBy
                }, commandType: CommandType.StoredProcedure);
                return Schmlist.Read<HologramStock>().ToList();
            }
        }

        public async Task<CommonResponse> GetHologramStockLastInsertedData(string prefix)
        {
            using (IDbConnection dbcon = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var getLastInsertNumber = await dbcon.QueryFirstOrDefaultAsync<CommonResponse>("sp_GetHologramStockLastInsertedToNumber", new {Prefix=prefix },commandType: CommandType.StoredProcedure);
                return getLastInsertNumber;
            }
        }

        public async Task<CommonResponse> IsFromNumberToNumberExistInHologramMapping(HologramStockDto stock)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await con.QueryFirstOrDefaultAsync<CommonResponse>("sp_IsFromNumberToNumberExistInHologramMapping",
                            param: new
                            {
                                Id = stock.Id,
                                Prefix = stock.Prefix,
                                FromNumber = stock.FromNumber,
                                ToNumber = stock.ToNumber,
                                IsActive = stock.IsActive
                            },
                            commandType: CommandType.StoredProcedure);

                return reader;
            }
        }

        public async Task<CommonResponse> SaveStock(HologramStockDto stock)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("sp_SaveHologramStock",
                            param: new
                            {
                                Prefix = stock.Prefix,
                                FromNumber = stock.FromNumber,
                                ToNumber = stock.ToNumber,
                                IsActive = stock.IsActive,
                                Quantity = stock.Quantity,
                                Remarks =   stock.Remarks,
                                CreateBy = stock.CreatedBy         
                            },
                            commandType: CommandType.StoredProcedure);

                return reader;
            }
        }

        public async Task<CommonResponse> UpdateStock(HologramStockDto stock)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("sp_UpdateHologramStock",
                            param: new
                            {
                                Id = stock.Id,
                                Prefix = stock.Prefix,
                                FromNumber = stock.FromNumber,
                                ToNumber = stock.ToNumber,
                                IsActive = stock.IsActive,
                                Quantity = stock.Quantity,
                                Remarks = stock.Remarks,
                                CreateBy = stock.CreatedBy
                            },
                            commandType: CommandType.StoredProcedure);

                return reader;
            }
        }
       
    }
}

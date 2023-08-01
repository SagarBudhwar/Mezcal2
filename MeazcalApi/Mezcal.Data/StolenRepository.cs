using Dapper;
using Mezcal.Dtos;
using Mezcal.Helper;
using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.Data
{
    public class StolenRepository : IStolenRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public StolenRepository(IOptions<DbConnection> appSettings)
        {
            _appSettings = appSettings;
        }

        public async Task<List<StockDto>> CheckHologramStolen(string Prefix,long FromNumber, long ToNumber)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "sp_CheckHologramStolen";

                var Schmlist = await con.QueryMultipleAsync(sql, new
                {
                    Prefix = Prefix,
                    FromNumber = FromNumber,
                    Tonumber = ToNumber,
                }, commandType: CommandType.StoredProcedure);
                return Schmlist.Read<StockDto>().ToList();
            }
        }
        public async Task<List<StockDto>> CheckStock(string Prefix)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "CheckStock";

                var Schmlist = await con.QueryMultipleAsync(sql, new
                {
                    Prefix
                }, commandType: CommandType.StoredProcedure);
                return Schmlist.Read<StockDto>().ToList();
            }
        }

        public async Task<List<Stock>> GetAllStolen(CommonUtilsReport commonUtils)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "sp_GetHologramStolenStock";

                var Schmlist = await con.QueryMultipleAsync(sql, new
                {
                    pageNumber = commonUtils.PageNumber,
                    pageSize = commonUtils.PageSize,
                    sortOrder = commonUtils.SortOrder,
                    search = commonUtils.Search,
                    sortBy = commonUtils.SortBy,
                    FromDate = commonUtils.FromDate,
                    ToDate = commonUtils.ToDate

                }, commandType: CommandType.StoredProcedure);
                return Schmlist.Read<Stock>().ToList();
            }
        }

        public async Task<CommonResponse> IsFromNumberAndToNumberExist(string Prefix,long fromNumber, long toNumber)
        {
            using (IDbConnection dbcon = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var getLastInsertNumber = await dbcon.QueryFirstOrDefaultAsync<CommonResponse>("IsFromNumberAndToNumberExistInHologramStock",
                    param: new
                    {
                        Prefix = Prefix,
                        FromNumber = fromNumber,
                        ToNumber = toNumber,
                    }, commandType: CommandType.StoredProcedure);
                return getLastInsertNumber;
            }
        }

        public async Task<CommonResponse> SaveStolen(StockDto stock)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("sp_SaveHologramStolen",
                            param: new
                            {
                                ProductId = stock.ProductId,
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

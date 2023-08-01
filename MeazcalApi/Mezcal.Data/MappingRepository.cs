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
    public class MappingRepository : IMappingRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
    

        public MappingRepository(IOptions<DbConnection> appSettings)
        {
            _appSettings = appSettings;
        }
        public async Task<List<MappingList>> GetMappingListForGrid(CommonUtilsReport Uc)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "SpGetMappingListForGrid";

                var OrDetlist = await con.QueryAsync<MappingList>(sql, new
                {
                    pageNumber = Uc.PageNumber,
                    pageSize = Uc.PageSize,
                    sortOrder = Uc.SortOrder,
                    search = Uc.Search,
                    sortBy = Uc.SortBy,
                    Uc.FromDate,
                    Uc.ToDate,
                }, commandType: CommandType.StoredProcedure); ;

                con.Close();

                return OrDetlist.ToList();
            }
        }

        public async Task<List<DeMappingList>> GetDeMappingListForGrid(CommonUtilsReport Uc)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "SpGetDeMappingListForGrid";

                var OrDetlist = await con.QueryAsync<DeMappingList>(sql, new
                {
                    pageNumber = Uc.PageNumber,
                    pageSize = Uc.PageSize,
                    sortOrder = Uc.SortOrder,
                    search = Uc.Search,
                    sortBy = Uc.SortBy,
                    Uc.FromDate,
                    Uc.ToDate,
                }, commandType: CommandType.StoredProcedure); ;

                con.Close();

                return OrDetlist.ToList();
            }
        }

        public async Task<CommonResponse> SaveMapping(MappingDto mappingDto)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("SpSaveHologramMapping",
                            param: new
                            {
                                ProductId = mappingDto.ProductId,
                                Prefix = mappingDto.Prefix,
                                FromNumber = mappingDto.FromNumber,
                                ToNumber = mappingDto.ToNumber,
                                Quantity = mappingDto.Quantity,
                                CreatedBy = mappingDto.CreatedBy,

                            },
                            commandType: CommandType.StoredProcedure);

                return reader;
            }
        }
        public async Task<CommonResponse> EditHologramMapping(MappingDto mappingDto)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("EditHologramMapping",
                            param: new
                            {
                                Id = mappingDto.Id,
                                ProductId = mappingDto.ProductId,
                                Prefix = mappingDto.Prefix,
                                FromNumber = mappingDto.FromNumber,
                                ToNumber = mappingDto.ToNumber,
                                Quantity = mappingDto.Quantity,
                                CreatedBy = mappingDto.CreatedBy,
                                IsActive = mappingDto.IsActive

                            },
                            commandType: CommandType.StoredProcedure);

                return reader;
            }
        }
        public async Task<List<HologramStcokList>> GetHologramStcokSummary(string Prefix)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var Result = await dbConnection.QueryAsync<HologramStcokList>("SpHologramStcokSummary",
                           new { Prefix}, commandType: CommandType.StoredProcedure);

                return Result.ToList();
            }
        }
        public async Task<List<CheckHologramMapping>> CheckHologramMapping(string Prefix,long FromNumber, long ToNumber)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "SpCheckHologramMapping";

                var OrDetlist = await con.QueryAsync<CheckHologramMapping>(sql, new
                {
                    Prefix = Prefix,
                    FromNumber = FromNumber,
                    ToNumber = ToNumber
                }, commandType: CommandType.StoredProcedure); ;

                con.Close();

                return OrDetlist.ToList();
            }
        }
        public async Task<List<CheckHologramMapping>> CheckHologramDamage(string Prefix,long FromNumber, long ToNumber)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                string sql = "CheckHologramDamage";

                var OrDetlist = await con.QueryAsync<CheckHologramMapping>(sql, new
                {
                    Prefix = Prefix,
                    FromNumber = FromNumber,
                    ToNumber = ToNumber
                }, commandType: CommandType.StoredProcedure); ;

                con.Close();

                return OrDetlist.ToList();
            }
        }
    
        public async Task<List<HologramStcokList>> GetAvailabelHologramStock(CommonUtils Uc)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))  
            {
                con.Open();
                string sql = "sp_GetAvilabelHologramStock";

                var resultlist = await con.QueryAsync<HologramStcokList>(sql, new
                {
                    pageNumber = Uc.PageNumber,
                    pageSize = Uc.PageSize,
                    sortOrder = Uc.SortOrder,
                    search = Uc.Search,
                    sortBy = Uc.SortBy
                }, commandType: CommandType.StoredProcedure); 

                con.Close();

                return resultlist.ToList();
            }

        }

        public async Task<List<ProductsListForDdl>> GetProductsListForDdl()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var Result = await dbConnection.QueryAsync<ProductsListForDdl>("GetProductsListForDdl",
                            commandType: CommandType.StoredProcedure);

                return Result.ToList();
            }
        }

        public async Task<List<ProductListForMapping>> GetProductListForSelect(CommonUtils search)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryMultipleAsync("sp_GetProductListForSelectProduct",
                            param: new
                            {
                                search.PageNumber,
                                search.PageSize,
                                search.SortBy,
                                search.SortOrder,
                                search.Search
                            },
                            commandType: CommandType.StoredProcedure);

                var listValue = reader.Read<ProductListForMapping>().ToList();
                return listValue;
            }
        }
    }
   
}

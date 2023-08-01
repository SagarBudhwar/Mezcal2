using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Dapper;
using Mezcal.Dtos;
using Mezcals.IRepository;
using Microsoft.Extensions.Options;
using System.Data;
using Mezcal.Helper;
using System.Data.SqlClient;
using Mezcal.Models;

namespace Mezcal.Data
{
    public class CommonMasterRepository : ICommonRepository
    {
        private readonly IOptions<DbConnection> _appSettings;

        public CommonMasterRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }


        public async Task<Response> AddBrandMaster(BrandMaster brand)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddBrandName",
                               param: new
                               {
                                   brand.BrandName,
                                   brand.CreatedBy,
                                   brand.IsActive,
                                   brand.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateBrandMaster(BrandMaster brand)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateBrandName",
                               param: new
                               {
                                   brand.ID,
                                   brand.BrandName,
                                   brand.CreatedBy,
                                   brand.IsActive,
                                   brand.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> AddTypeMaster(TypeMaster type)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddType",
                               param: new
                               {
                                   type.Type,
                                   type.CreatedBy,
                                   type.IsActive,
                                   type.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateTypeMaster(TypeMaster type)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateType",
                               param: new
                               {
                                   type.ID,
                                   type.Type,
                                   type.CreatedBy,
                                   type.IsActive,
                                   type.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> AddSpeciesMaster(SpeciesMaster species)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddSpecies",
                               param: new
                               {
                                   species.SpeciesName,
                                   species.CreatedBy,
                                   species.IsActive,
                                   species.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateSpeciesMaster(SpeciesMaster species)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateSpecies",
                               param: new
                               {
                                   species.ID,
                                   species.SpeciesName,
                                   species.CreatedBy,
                                   species.IsActive,
                                   species.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> AddStateMaster(StateMaster state)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddStateMaster",
                               param: new
                               {
                                   state.StateName,
                                   state.CreatedBy,
                                   state.IsActive,
                                   state.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateStateMaster(StateMaster state)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateStateName",
                               param: new
                               {
                                   state.ID,
                                   state.StateName,
                                   state.CreatedBy,
                                   state.IsActive,
                                   state.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<List<StateMaster>> GetStateMasters(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<StateMaster>("uspGetStateList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<StateMaster>> GetStateMasterList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<StateMaster>("uspGetStateList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<TypeMaster>> GetTypeMasterList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<TypeMaster>("uspGetTypeList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }

        public async Task<List<SpeciesMaster>> GetSpeciesMasterList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<SpeciesMaster>("uspGetSpeciesList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<CategoryMaster>> GetCategoryList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<CategoryMaster>("uspGetCategoryList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<BrandMaster>> GetBrandList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<BrandMaster>("uspBrandList", new
                {
                    request.PageNo,
                    request.PageSize,
                    request.SearchValue,
                    request.SortColumn,
                    request.SortOrder
                }, commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<Response> AddProductCategory(CategoryMaster category)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddProductCategory",
                               param: new
                               {
                                   category.ProductCategory,
                                   category.IsActive,
                                   category.CreatedBy,
                                   category.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateProductCategory(CategoryMaster category)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateProductCategory",
                               param: new
                               {
                                   category.ID,
                                   category.ProductCategory,
                                   category.IsActive,
                                   category.CreatedBy,
                                   category.InActiveReason
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }

    }
}

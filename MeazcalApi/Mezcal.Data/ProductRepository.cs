using Dapper;
using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using Mezcal.Helper;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Mezcal.Data
{
    public class ProductRepository: IProductRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public ProductRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }
        public async Task<List<Brand>> GetBrandListForDDL()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<Brand>("uspGetBrandListForDDL",
                                commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<Category>> GetCategoryListForDDL()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<Category>("uspGetCategoryListForDDL",
                                commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<TypeData>> GetTypeListForDDL()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<TypeData>("uspGetTypeForDDL",
                                commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<SpeciesData>> GetSpeciesListForDDL()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<SpeciesData>("uspGetSpeciesForDDL",
                                commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<StateData>> GetStateListForDDL()
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<StateData>("uspGetStateDataForDDL",
                                commandType: CommandType.StoredProcedure);
                return res.ToList();
            }
        }
        public async Task<List<ProductList>> GetProductList(CommonDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var res = await dbConnection.QueryAsync<ProductList>("uspGetProductMasterData", new
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
        public async Task<Response> AddProduct(ProductDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspAddProductData", new
                {
                    request.ProductName,
                    request.CategoryID,
                    request.BrandID,
                    request.SpeciesID,
                    request.TypeID,
                    request.StateID,
                    request.Ingredients,
                    request.Presentation,
                    request.CertificationNo,
                    request.BottledLot,
                    request.CompanyName,
                    request.ProductionState,
                    request.CreatedBy,
                    request.IsActive,
                    request.Attributes,
                    request.ImagePath
                }, commandType: CommandType.StoredProcedure);
            }
        }
        public async Task<Response> UpdateProduct(ProductDto request)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<Response>("uspUpdateProductMasterData", new
                {
                    request.ID,
                    request.ProductName,
                    request.CategoryID,
                    request.BrandID,
                    request.SpeciesID,
                    request.TypeID,
                    request.StateID,
                    request.Ingredients,
                    request.Presentation,
                    request.CertificationNo,
                    request.BottledLot,
                    request.CompanyName,
                    request.ProductionState,
                    request.CreatedBy,
                    request.IsActive,
                    request.Attributes,
                    request.ImagePath
                }, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

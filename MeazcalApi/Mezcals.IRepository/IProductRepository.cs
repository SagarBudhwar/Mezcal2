using System;
using System.Collections.Generic;
using System.Text;
using Mezcal.Dtos;
using System.Security.Claims;
using System.Threading.Tasks;
using Mezcal.Models;

namespace Mezcal.IRepository
{
    public interface IProductRepository
    {
        Task<List<Brand>> GetBrandListForDDL();
        Task<List<Category>> GetCategoryListForDDL();
        Task<List<TypeData>> GetTypeListForDDL();
        Task<List<SpeciesData>> GetSpeciesListForDDL();
        Task<List<StateData>> GetStateListForDDL();
        Task<List<ProductList>> GetProductList(CommonDto dto);
        Task<Response> AddProduct(ProductDto dto);
        Task<Response> UpdateProduct(ProductDto dto);
    }
}

using System;
using System.Collections.Generic;
using System.Text;
using Mezcal.Dtos;
using System.Security.Claims;
using System.Threading.Tasks;
using Mezcal.Models;

namespace Mezcals.IRepository
{
    public interface ICommonRepository
    {
        Task<Response> AddBrandMaster(BrandMaster brand);
        Task<Response> UpdateBrandMaster(BrandMaster brand);
        Task<Response> AddTypeMaster(TypeMaster type);
        Task<Response> UpdateTypeMaster(TypeMaster type);
        Task<Response> AddSpeciesMaster(SpeciesMaster species);
        Task<Response> UpdateSpeciesMaster(SpeciesMaster species);
        //Task<Response> GetStateMaster(StateMaster state);
        Task<Response> UpdateStateMaster(StateMaster state);
        Task<Response> AddStateMaster(StateMaster state);
        Task<List<StateMaster>> GetStateMasterList(CommonDto common);
        Task<List<TypeMaster>> GetTypeMasterList(CommonDto common);
        Task<List<SpeciesMaster>> GetSpeciesMasterList(CommonDto common);
        Task<List<CategoryMaster>> GetCategoryList(CommonDto common);
        Task<List<BrandMaster>> GetBrandList(CommonDto common);
        Task<Response> AddProductCategory(CategoryMaster category);
        Task<Response> UpdateProductCategory(CategoryMaster category);
    }
}

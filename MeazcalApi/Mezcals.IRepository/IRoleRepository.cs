using System;
using System.Collections.Generic;
using Mezcal.Models;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mezcal.Dtos;

namespace Mezcal.IRepository
{
     public interface IRoleRepository
    {
        Task<List<Role>> GetRole(CommonUtils commonUtils);
        Task<CommonResponse> CreateUpdateRole(RoleRequest request);
        Task<CommonResponse> AssignPageToRole(MapRolePageRequest roleManage);
        Task<List<RoleForUsers>> GetRoleForUsers();
        Task<IEnumerable<RoleAccess>> GetRoleAccesses(int roleId);
        Task<List<PageByRoleId>> GetPageByRoleId(int roleId);
        Task<IEnumerable<UserRoleResponse>> GetUserRoleListForDdl();
    }
}

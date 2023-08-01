using Dapper;
using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Mezcal.Helper;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

using System.Linq;

namespace Mezcal.Data
{

    public  class RoleRepository : IRoleRepository
    {
        private readonly IOptions<DbConnection> _appSettings;
        public RoleRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }


        public async Task<List<Role>> GetRole(CommonUtils commonUtils)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryMultipleAsync("spGetRoles",
                               param: new
                               {
                                   PageNo = commonUtils.PageNumber,
                                   SearchValue = commonUtils.Search,
                                   PageSize = commonUtils.PageSize,
                                   SortColumn = commonUtils.SortBy,
                                   SortOrder = commonUtils.SortOrder,
                                   commonUtils.IsActive
                               },
                               commandType: CommandType.StoredProcedure);

                var listValue = reader.Read<Role>().ToList();
                return listValue;
            }
        }

        public async Task<CommonResponse> CreateUpdateRole(RoleRequest role)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("sp_CreateUpdateRole",
                       param: new
                       {
                           role.RoleId,
                           role.RoleName,
                           role.UpdatedBy,
                           role.IsActive,
                           role.Remarks
                       },
                       commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<CommonResponse> AssignPageToRole(MapRolePageRequest roleManage)
        {
            using (IDbConnection connection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await connection.QueryFirstOrDefaultAsync<CommonResponse>("sp_UserRolePageInsert", new
                {
                    roleManage.RoleId,
                    userRolePage = roleManage.Pages.AsTableValuedParameter("dbo.tvp_UserRolePage", new[] { "PageId", "ViewRight" }),
                    roleManage.UpdatedBy,
                }, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<List<RoleForUsers>> GetRoleForUsers()
        {
            using IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection);
            var reader = await dbConnection.QueryMultipleAsync("sp_GetRolesForUsers",
                               param: new
                               {
                               },
                               commandType: CommandType.StoredProcedure);

            var listValue = reader.Read<RoleForUsers>().ToList();
            return listValue;
        }


        public async Task<IEnumerable<UserRoleResponse>> GetUserRoleListForDdl()
        {
            using (var db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                string readSp = "sp_GetUserRoleListForDdl";

                var res = await db.QueryAsync<UserRoleResponse>(readSp, new
                {


                }, commandType: CommandType.StoredProcedure);
                db.Close();
                return res.ToList();
            }
        }

        public async Task<IEnumerable<RoleAccess>> GetRoleAccesses(int roleId)
        {
            using (IDbConnection connection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await connection.QueryMultipleAsync("sp_GetRoleDetail",
                    param: new { RoleId = roleId },
                    commandType: CommandType.StoredProcedure);

                var list = reader.Read<RolePage>().ToList();

                var parents = list.Where(p => p.ParentId == 0);
                List<RoleAccess> data = new List<RoleAccess>();                
                foreach (var parent in parents)
                {
                    List<RolePageChildrenAccess> _children = new List<RolePageChildrenAccess>();
                    RoleAccess obj = new RoleAccess();
                    obj.Data = parent;
                    var childDts = list.Where(m => m.ParentId == parent.PageId);
                    foreach (var childDt in childDts)
                    {
                        RolePageChildrenAccess _chld = new RolePageChildrenAccess();
                        RolePage Cobj = new RolePage();
                        Cobj.RoleId = parent.RoleId;
                        Cobj.PageId = childDt.PageId;
                        Cobj.PageName = childDt.PageName;
                        Cobj.Menu = childDt.Menu;
                        Cobj.Icon = childDt.Icon;
                        Cobj.SubMenu = childDt.SubMenu;
                        Cobj.ParentId = childDt.ParentId;
                        Cobj.SerialNo = childDt.SerialNo;
                        Cobj.RolePageId = childDt.RolePageId;
                        Cobj.ViewRight = childDt.ViewRight;
                        _chld.Data = Cobj;
                        // _children.Add(Cobj);
                        _chld.Children = new List<RoleAccess>();
                        _children.Add(_chld);
                    }
                   obj.Children = _children;
                    data.Add(obj);
                }
                return data;
            }
        }




        public async Task<List<PageByRoleId>> GetPageByRoleId(int roleId)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var reader = await dbConnection.QueryMultipleAsync("sp_GetPageByRoleId",
                    param: new { RoleId = roleId },
                    commandType: CommandType.StoredProcedure);

                var listValue = reader.Read<PageByRoleId>().ToList();
                var menus = listValue.Where(x => x.ParentId == 0);
                List<PageByRoleId> usermenu = new List<PageByRoleId>();
                foreach (var menu in menus)
                {
                  
                    List<ChildPageByRoleId> _children = new List<ChildPageByRoleId>();
                    PageByRoleId parent = new PageByRoleId();
                    parent.Name = menu.Name;
                    parent.Icon = menu.Icon;
                    parent.PageId = menu.PageId;
                    parent.ParentId = menu.ParentId;
                    parent.Url = menu.Url;
                    var submenus = listValue.Where(x => x.ParentId == menu.PageId).ToList();

                    foreach (var submenu in submenus)
                    {
                        PageByRoleId Childmenu = new PageByRoleId();
                        Childmenu.Name = submenu.Name;
                        Childmenu.Icon = submenu.Icon;
                        Childmenu.PageId = submenu.PageId;
                        Childmenu.ParentId = submenu.ParentId;
                        Childmenu.Url = submenu.Url;

                        _children.Add(new ChildPageByRoleId
                        {
                            ParentId = Childmenu.ParentId,
                            Name = Childmenu.Name,
                            Icon = Childmenu.Icon,
                            Url = Childmenu.Url,
                            Children = new List<PageByRoleId>()
                        }) ;

                    }

                    parent.Children = _children;
                    usermenu.Add(parent);
                    
                }
                return usermenu;
            }
        }

    }
}





































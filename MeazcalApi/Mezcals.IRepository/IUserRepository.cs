using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.IRepository
{
    public interface IUserRepository
    {
        Task<CommonResponse> ChangeOwnPassword(ChangePasswordDto password);
        Task<UserOldPasswordResponse> GetOldPassword(int UserId);
        Task<UserProfileResponse> GetUserById(int userId);
        Task<UserMasterResponse> CreateUpdateUser(UserDto userMaster);
        Task<CommonResponse> SaveUserDetail(UserDto userMaster);
        Task<IEnumerable<GetAllUsersList>> GetUsersList(CommonUtils userMaster);

        Task<UserMasterResponse> GetUserData(string email);
        Task<UserMasterResponse> GetUserDataWeb(string email);
        Task<Response> IsResetPassword(int userId, bool isResetPassword);
        Task<UserMasterResponse> UpdateProfile(UpdateProfile user);
        Task<IEnumerable<UserTypeResponse>> GetUserTypeListForDdl();
        Task<CommonResponse> ActiveDeactiveUser(int UserId);

    }
}

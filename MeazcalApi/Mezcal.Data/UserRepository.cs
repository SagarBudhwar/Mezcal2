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
    public class UserRepository : IUserRepository
    {

        private readonly IOptions<DbConnection> _appSettings;

        public UserRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }

        public async Task<CommonResponse> ChangeOwnPassword(ChangePasswordDto password)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<CommonResponse>("ChangeOwnPassword",
                               param: new
                               {
                                   password.UserId,
                                   password.PasswordHash,
                                   password.PasswordSalt
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<UserOldPasswordResponse> GetOldPassword(int UserId)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<UserOldPasswordResponse>("GetUserOldPasswordById",
                               param: new
                               {
                                   UserId
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<UserProfileResponse> GetUserById(int userId)
        {
            using (IDbConnection dbConnection = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                return await dbConnection.QueryFirstOrDefaultAsync<UserProfileResponse>("GetUserProfileDetailById",
                               param: new
                               {
                                   userId
                               },
                               commandType: CommandType.StoredProcedure);
            }
        }
        //public async Task<UserMasterResponse> CreateUpdateUser(UserMasterDto user)
        //{
        //    //SingleResponse<UserMaster> res = new SingleResponse<UserMaster>();
        //    using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
        //    {
        //        con.Open();
        //        var _resResult = await con.QueryAsync<UserMasterResponse>("spCreateUpdateUser", new
        //        {
        //            @UserId = user.UserId,
        //            @Username = user.Username,
        //            @Password = user.Password,
        //            @Name = user.Name,
        //           // @LastName = user.LastName,
        //            @Email = user.Email,
        //            @MobileNo = user.MobileNo,
        //            @UserType = user.UserType,
        //          //  @ProfileImage = user.ProfileImage,
        //            @DeviceType = user.DeviceType,
        //            @IsActive = user.IsActive,
        //            @InActiveReason = user.InActiveReason,
        //            @CreatedBy = user.CreatedBy,
        //            @CreatedDt = user.CreatedDt,
        //            @UpdatedBy = user.UpdatedBy,
        //            @UpdatedDt = user.UpdatedDt,
        //            //@Token = user.Token,
        //            //@RefreshToken = user.RefreshToken,
        //            //@Salt = user.Salt,
        //            //@IsResetPassword = user.IsResetPassword
        //        }, commandType: CommandType.StoredProcedure);

        //        return _resResult.FirstOrDefault();

        //    }
        //}
        public async Task<UserMasterResponse> CreateUpdateUser(UserDto user)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryAsync<UserMasterResponse>("spCreateUpdateUser", new
                {
                    UserId = user.UserId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Mobile = user.Mobile,
                    RoleId = user.RoleId,
                    Password = user.Password,
                    PasswordHash = user.PasswordHash,
                    PasswordSalt = user.PasswordSalt,
                    UserType = user.UserType,
                    DeviceType = user.DeviceType,
                    IsActive = user.IsActive,
                  

                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();

            }
        }

        public async Task<UserMasterResponse> GetUserData(string email)
        {
            UserMasterResponse _resResult = new UserMasterResponse();
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var result = await con.QueryAsync<UserMasterResponse>("spGetUserData", new
                { @email = email }, commandType: CommandType.StoredProcedure);

                _resResult = result?.FirstOrDefault();
            }

            return _resResult;
        }
        public async Task<UserMasterResponse> GetUserDataWeb(string email)
        {
            UserMasterResponse _resResult = new UserMasterResponse();
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                var result = await con.QueryAsync<UserMasterResponse>("spGetUserDataForWeb", new
                { @email = email }, commandType: CommandType.StoredProcedure);

                _resResult = result?.FirstOrDefault();
            }

            return _resResult;
        }
        public async Task<Response> IsResetPassword(int userId, bool isResetPassword)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryAsync<Response>("spResetPassword", new
                {
                    @userId = userId,
                    @IsReset = isResetPassword
                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();
            }
        }
        public async Task<CommonResponse> SaveUserDetail(UserDto user)
        {

            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var _resResult = await con.QueryAsync<CommonResponse>("sp_SaveUserDetail", new
                {
                    UserId=user.UserId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Mobile = user.Mobile,
                    RoleId = user.RoleId,
                    PasswordHash = user.PasswordHash,
                    PasswordSalt = user.PasswordSalt,
                    UserType = user.UserType,
                    DeviceType = user.DeviceType,
                    IsActive = user.IsActive,
                    InActiveReason = user.InActiveReason,
                    CreatedBy = user.CreatedBy,

                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();

            }
        }

 

        public async Task<IEnumerable<GetAllUsersList>> GetUsersList(CommonUtils commonUtils)
        {
            using (var db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                string readSp = "GetAllUsers";

                var res = await db.QueryAsync<GetAllUsersList>(readSp, new { 
                
                    commonUtils.PageSize,
                    commonUtils.PageNumber,
                    commonUtils.SortBy,
                    commonUtils.SortOrder,
                    commonUtils.Search
                
                }, commandType: CommandType.StoredProcedure);
                db.Close();
                return res.ToList();
            }
        }

        public async Task<IEnumerable<UserTypeResponse>> GetUserTypeListForDdl()
        {
            using (var db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                string readSp = "GetUserTypeListForDdl";

                var res = await db.QueryAsync<UserTypeResponse>(readSp, new
                {


                }, commandType: CommandType.StoredProcedure);
                db.Close();
                return res.ToList();
            }
        }
        public async Task<UserMasterResponse> UpdateProfile(UpdateProfile user)
        {
            using (var db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                var _resResult = await db.QueryAsync<UserMasterResponse>("spUpdateProfile", new
                {
                  
                    @UserId = user.UserId,
                    @UserName=user.UserName,
                    @Mobile=user.MobNo,
            



                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();
            }
        }

        public async Task<CommonResponse> ActiveDeactiveUser(int UserId)
        {
            using (var db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                var _resResult = await db.QueryAsync<CommonResponse>("sp_ActiveDeactiveUser", new
                {
                    @UserId = UserId

                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();
            }
        }
    }
}

using Mezcal.Dtos;
using Mezcal.Helper;
using Mezcal.Models;
using Mezcals.IRepository;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Mezcal.Data
{

    public class AuthRepository : IAuthRepository
    {
        private readonly IOptions<DbConnection> _appSettings;

        public AuthRepository(IOptions<DbConnection> appsetting)
        {
            _appSettings = appsetting;
        }

        public async Task<AuthResponse> Login(LoginDto loginDto)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var result = await con.QueryAsync<AuthResponse>("LoginUser",
               param: new { UserName = loginDto.UserName },
               commandType: CommandType.StoredProcedure
               );

                con.Close();
                return result.FirstOrDefault();

            }
        }
        public async Task<AuthMobileResponse> LoginMobile(LoginDtoMobile login)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var result = await con.QueryAsync<AuthMobileResponse>("spCheckUser",
               param: new {
                   @email = login.Email,
                   @password = login.Password
               },
               commandType: CommandType.StoredProcedure
               );

                con.Close();
                return result.FirstOrDefault();

            }
        }
        public async Task<AuthMobileResponse> GetUserDataMobile(string email)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var result = await con.QueryAsync<AuthMobileResponse>("spGetUserDataMobile",
               param: new
               {
                   @email = email
                  
               },
               commandType: CommandType.StoredProcedure
               );

                con.Close();
                return result.FirstOrDefault();

            }
        }

        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",
                audience: "http://localhost:5000",
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return tokenString;
        }

        public async Task<string> RefreshToken()
        {
            var token = Guid.NewGuid().ToString();
            using (IDbConnection db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                string sql = "CreateRefreshToken";
                var tknDtl = await db.QueryFirstOrDefaultAsync<CommonResponse>(sql, new
                {
                    RefreshToken = token
                }, commandType: CommandType.StoredProcedure);
                db.Close();
                return token;
            }
        }
        public async Task<CommonResponse> CheckRefreshToken(string refreshToken)
        {
            using (IDbConnection db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                string sql = "CheckRefreshToken";
                var res = await db.QueryFirstOrDefaultAsync<CommonResponse>(sql, new
                {
                    RefreshToken = refreshToken
                }, commandType: CommandType.StoredProcedure);
                db.Close();
                return res;
            }
        }
        //to create token
        public async Task<Response> CreateRefreshToken(UserMasterDto user)
        {
            using (IDbConnection db = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                db.Open();
                var _resResult = await db.QueryAsync<Response>("spCreateRefreshToken", new
                {
                    @ReferenceID = user.ReferenceID,
                    @RefreshToken = user.RefreshToken
                }, commandType: CommandType.StoredProcedure);

                return _resResult.FirstOrDefault();
            }
        }

        public async Task<List<GetPagesWithRoleResponse>> GetPagesWithRoleDetail(int RoleId)
        {
            using (var con = new SqlConnection(_appSettings.Value.DefaultConnection))
            {
                con.Open();
                var result = await con.QueryAsync<GetPagesWithRoleResponse>("sp_GetPagesWithRoleId",
               param: new {RoleId },
               commandType: CommandType.StoredProcedure
               );

                con.Close();
                return result.ToList();

            }
        }

    }
}

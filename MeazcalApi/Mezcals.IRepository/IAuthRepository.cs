using Mezcal.Dtos;
using Mezcal.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Mezcals.IRepository
{
    public interface IAuthRepository
    {

      public  Task<AuthResponse> Login(LoginDto loginDto);
        Task<AuthMobileResponse> LoginMobile(LoginDtoMobile loginDto);
        Task<AuthMobileResponse> GetUserDataMobile(string email);
        string GenerateAccessToken(IEnumerable<Claim> claims);
        Task<string> RefreshToken();
        Task<CommonResponse> CheckRefreshToken(string refreshToken);

        Task<List<GetPagesWithRoleResponse>> GetPagesWithRoleDetail(int RoleId);

    }
}

using Mezcal.Dtos;
using Mezcal.Models;
using Mezcals.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Mezcal.Controllers
{

    [AllowAnonymous]
    public class AuthController : BaseController
    {

        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;


        public AuthController(IAuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult<AuthResponse>> Login(LoginDto loginDto)
        {
           
            AuthResponse UserDetail = await _authRepository.Login(loginDto);
            if (UserDetail==null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "UserName or password mismatch !!", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "El nombre de usuario o la contraseña no coinciden !!", ResponseData = new { } });
            }

            if (UserDetail.RespCd==-1)
            {
                return Ok(new { ResponseData = new object(), ResponseMessage = UserDetail.RespMsg, ResponseCode = HttpStatusCode.NotFound });
            }

            if (UserDetail.RespCd == 1 )
            {
                using var hmac = new HMACSHA512(UserDetail.PasswordSalt);
                var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != UserDetail.PasswordHash[i])
                    {
                        //return Ok(new { ResponseCode = 201, ResponseDataRolePages = new object { }, ResponseMessage = "Invalid UserName or Password !!", ResponseData = new { } });
                        return Ok(new { ResponseCode = 201, ResponseDataRolePages = new object { }, ResponseMessage = "Usuario o contraseña invalido!!", ResponseData = new { } });
                    }
                }


                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, loginDto.UserName),
            new Claim(ClaimTypes.Role, "User")
        };

                string token = GenerateJWTToken(UserDetail.UserId.ToString(), Convert.ToInt16(_configuration["DbConnection:Token_Expire_in_Minutes"]));

                UserDetail.Token = token;
                UserDetail.RefreshToken = await _authRepository.RefreshToken();
                UserDetail.AccessToken = _authRepository.GenerateAccessToken(claims);


                ///////////////////////////// Get All PagesWithRole 

                var rolePagesRes = await _authRepository.GetPagesWithRoleDetail(UserDetail.RoleId);


                return Ok(new { ResponseData =UserDetail,ResponseDataRolePages=rolePagesRes, ResponseMessage = "", ResponseCode = HttpStatusCode.OK });

            }
            return Ok(new { ResponseData = new object { }, ResponseDataRolePages = new object { }, ResponseMessage = "", ResponseCode = 201 });
        }

        [HttpPost]
        public async Task<ActionResult<AuthMobileResponse>> LoginMobile(LoginDtoMobile loginDto)
        {
            AuthMobileResponse UserDetail = await _authRepository.GetUserDataMobile(loginDto.Email);
            AuthMobileResponse dbRes = await _authRepository.LoginMobile(loginDto);
           
            if (dbRes.ResponseCode == "200")
            {
                using var hmac = new HMACSHA512(dbRes.PasswordSalt);
                var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != UserDetail.PasswordHash[i])
                    {
                        //Invalid user name or password
                        return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Usuario o contraseña invalido !!", ResponseData = new { } });
                    }
                }


                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, loginDto.Email),
             //new Claim(ClaimTypes.PrimarySid.ToString(), loginDto)
            new Claim(ClaimTypes.Email, loginDto.Email),
          
        };

                string token = GenerateJWTToken(UserDetail.UserId.ToString(), Convert.ToInt16(_configuration["DbConnection:Token_Expire_in_Minutes"]));

                dbRes.Token = token;
                dbRes.RefreshToken = await _authRepository.RefreshToken();
                dbRes.AccessToken = _authRepository.GenerateAccessToken(claims);
               //User logged in successfully
                return Ok(new { ResponseData = dbRes, ResponseMessage = "ingreso aprovado", ResponseCode = HttpStatusCode.OK });

            }
            return Ok(new { ResponseData = new object { }, ResponseMessage =dbRes.ResponseMessage, ResponseCode = dbRes.ResponseCode });
        }

        private string GenerateJWTToken(string UserName, int expire_in_Minutes = 30)
        {
            //var Claims = new List<Claim>();
            //Claim claim = new Claim(JwtRegisteredClaimNames.NameId,user.UserName);
            //Claims.Add(claim);

            var Claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,UserName),
            };
            var Key = new SymmetricSecurityKey(Encoding.UTF8
               .GetBytes(_configuration["DbConnection:Token"]));

          //  var now = DateTime.UtcNow;

            var creds = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.Now.AddMinutes(Convert.ToInt32(expire_in_Minutes)),
                SigningCredentials = creds

            };


            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(securityTokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}

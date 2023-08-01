using Mezcal.Dtos;
using Mezcal.IRepository;
using Mezcal.Models;
using Mezcal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Mezcals.IRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Routing;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Net.Mail;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Mezcal.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthRepository _authRepository;
        private readonly IConfiguration _configuration;
        private IWebHostEnvironment _env;
        public UserController(IUserRepository userRepository, IAuthRepository authRepository, IConfiguration configuration,IWebHostEnvironment env)
        {
            _userRepository = userRepository;
            _authRepository = authRepository;
            _configuration = configuration;
            _env = env;
        }



        /// <summary>
        /// SAve User Details
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SaveUserDetail(UserDto userDto)
        {
            if (userDto is null)
            {
                throw new ArgumentNullException(nameof(userDto));
            }

            if (userDto.Email == "" || userDto.Email == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Email is required.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "coreo es requerido.", ResponseData = new { } });
            }

            if (userDto.Mobile == "" || userDto.Mobile == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Mobile is required.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "telefono es requerido.", ResponseData = new { } });
            }
            if (userDto.UserType == 0 || userDto.Mobile == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "User Type is required.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "tipo de usuario requerido.", ResponseData = new { } });
            }
            if (userDto.Password == "" || userDto.Password == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Please provide password.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "de clave requerida.", ResponseData = new { } });
            }
            if (userDto.RoleId == 0 || userDto.RoleId == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Please provide User Role.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "posicion del usuario requerido.", ResponseData = new { } });
            }

            if (userDto.IsActive == true)
            {
                userDto.InActiveReason = "";
            }

            using var hmac = new HMACSHA512();
            userDto.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
            userDto.PasswordSalt = hmac.Key;

            var result = await _userRepository.SaveUserDetail(userDto);

            if (result.RespCd == 1)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = result.RespMsg, ResponseData = new { } });
            }

            else
            {
                return Ok(new { ResponseCode = result.RespCd, ResponseMessage = result.RespMsg, ResponseData = new { } });
            }

        }


        /// <summary>
        /// Update User Details
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateUserDetail(UserDto userDto)
        {
            if (userDto is null)
            {
                throw new ArgumentNullException(nameof(userDto));
            }

            if (userDto.UserId == 0)
            {
                //User details can't be update.
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "los detalles del usuario no se pueden actualizar", ResponseData = new {  } });
            }
            if (userDto.Email == "" || userDto.Email == null)
            {
                //Please provide Email.
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "proporcione un correo electrónico.", ResponseData = new { } });
            }

            if (userDto.Mobile == "" || userDto.Mobile == null)
            {
                //Please provide Mobile No.
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "proporcione el número de teléfono móvil", ResponseData = new { } });
            }
            if (userDto.UserType == 0 || userDto.Mobile == null)
            {
                //return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "User Type is required.", ResponseData = new { } });
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "tipo de usuario requerido.", ResponseData = new { } });
            }
            if (userDto.RoleId == 0 || userDto.RoleId == null)
            {
                
                    //Please provide User Role.
                return Ok(new { ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Proporcione el rol de usuario", ResponseData = new { } });
            }
            if (userDto.IsActive == true)
            {
                userDto.InActiveReason = "";
            }

            var result = await _userRepository.SaveUserDetail(userDto);

            if (result.RespCd == 1)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = result.RespMsg, ResponseData = new { } });
            }

            else
            {
                return Ok(new { ResponseCode = result.RespCd, ResponseMessage = result.RespMsg, ResponseData = new { } });
            }

        }


        /// <summary>
        /// Users List from UserMaster to show in grid
        /// </summary>
        /// <param name="commonUtils"></param>
        /// <returns></returns>

        [HttpPost]

        public async Task<IActionResult> GetUsersList(CommonUtils commonUtils)
        {
            var userlist = await _userRepository.GetUsersList(commonUtils);

            if (userlist.Count() > 0)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = userlist });
            }
            else
            {//Data Not Found
                return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "informacion no encontrada", ResponseData = userlist });
            }
        }

        [HttpGet]

        public async Task<IActionResult> GetUserTypeListForDdl()
        {
            var userlist = await _userRepository.GetUserTypeListForDdl();

            if (userlist.Count() > 0)
            {
                return Ok(new { ResponseCode = HttpStatusCode.OK, ResponseMessage = "Data Found", ResponseData = userlist });
            }
            else
            {
                return Ok(new { ResponseCode = HttpStatusCode.NotFound, ResponseMessage = "informacion no encontrada", ResponseData = userlist });
            }
        }



        /// <summary>
        /// Change user login password
        /// </summary>
        /// <param name="changeLoginPasswordDTO"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ChangeLoginPassword(ChangeOwnPassword changeOwnPassword)
        {
            if (changeOwnPassword is null)
            {
                throw new ArgumentNullException(nameof(changeOwnPassword));
            }

            if (changeOwnPassword.Password == changeOwnPassword.OldPassword)
            {
                //Sorry !! Old password and New Password can't be same.  
                return Ok(new { ResponseData = new object { },ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Perdón !! La contraseña anterior y la contraseña nueva no pueden ser iguales." });
            }

            UserOldPasswordResponse UserDetail = await _userRepository.GetOldPassword(changeOwnPassword.UserId);

            if (UserDetail.RespCd == 200)
            {

                /////////////////////// Compare User's given Old Password with old Password in db if both are same or not

                using var hmac = new HMACSHA512(UserDetail.PasswordSalt);
                var ComputedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changeOwnPassword.OldPassword));

                for (int i = 0; i < ComputedHash.Length; i++)
                {
                    if (ComputedHash[i] != UserDetail.PasswordHash[i])
                    {
                        //Sorry!! Old password did not match.
                        return Ok(new {  ResponseData = new object{ },ResponseCode = HttpStatusCode.BadRequest, ResponseMessage = "Perdón !! La contraseña anterior no coincidía." });
                    }
                }


                using var hmacNewPass = new HMACSHA512();

                ChangePasswordDto changePasswordDto = new ChangePasswordDto()
                {
                    UserId = changeOwnPassword.UserId,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(changeOwnPassword.Password)),
                    PasswordSalt = hmac.Key
                };

                var response = await _userRepository.ChangeOwnPassword(changePasswordDto);

                if (response != null && response.RespCd == 200)
                    //Password changed Sucessfully
                    return Ok(new {  ResponseData = new object { },ResponseCode = 200, ResponseMessage = "Contraseña cambiada correctamente!" });
                else
                {
                    return Ok(new { ResponseData = new object { }, ResponseCode = 404, ResponseMessage = response.RespMsg });
                }


            }
            else
            {
                return Ok(new { ResponseData = new object { }, ResponseCode = 404, ResponseMessage = UserDetail.RespMsg });
            }

        }


        /// <summary>
        ///  Get User details By Id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>User Details</returns>

        [HttpGet]
        public async Task<IActionResult> GetUserProfileById(int userId)
        {
            if (userId is 0)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var result = await _userRepository.GetUserById(userId);
            if (result != null)
                //User Profile Details By Id!
                return Ok(new { ResponseCode = 200, ResponseMessage = "detalles del perfil de usuario por Id!", ResponseData = result }); 

            else
            {
                //something went wrong
                return Ok(new { ResponseCode = 404, ResponseMessage = "algo salió mal", ResponseData = result });
            }
        }
        //Api for mobile user Registration
        [HttpPost]
        public async Task<IActionResult> CreateUpdateUserMobile(UserDto user)
        {

            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password));
            user.PasswordSalt = hmac.Key;
            var dbres = await _userRepository.CreateUpdateUser(user);
            if (dbres.ResponseCode == "200")
            {
                List<UserMasterResponse> _objusers = new List<UserMasterResponse>();

                var jwtToken = GenerateJWTToken(user.Email.ToString(), Convert.ToInt16(_configuration["DbConnection:Token_Expire_in_Minutes"]));

                dbres.Token = jwtToken;
                dbres.RefreshToken = await _authRepository.RefreshToken();

                //user registered successfully
                return Ok(new { ResponseData = dbres, ResponseMessage = "su registro fue exitoso", ResponseCode = HttpStatusCode.OK });

                // dbres.AccessToken = _authRepository.GenerateAccessToken(claims);

            }
            else {
                //user already exists
                return Ok(new { ResponseData = new object { }, ResponseMessage = "este usuario ya existe ", ResponseCode = 400 });
            }

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
        [HttpPost]
        public async Task<Response> ForgotPasswordWeb(ForgotPassword user)
        {
            Response res = new Response();

            string PasswordHash = string.Empty;
            string PasswordSalt = string.Empty;
            var dbRes = await _userRepository.GetUserDataWeb(user.Email);

            if (dbRes == null)
            {
                //Something went wrong!!
                res.ResponseMessage = "Algo salió mal !!";
                //res.ResponseCode = "202";
                res.ResponseCode = "400";

                return res;
            }
            else if (dbRes.ResponseCode == "-1")
            {
                res.ResponseMessage = dbRes.ResponseMessage;
                //res.ResponseCode = "201";
                res.ResponseCode = "400";

                return res;
            }
            else
            {

                //// if (dbRes != null)
                //using var hmac = new HMACSHA512();
                //PasswordHash = Convert.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(PasswordHash)));
                //PasswordSalt = (hmac.Key).ToString();

                using var hmac = new HMACSHA512();

                ChangePasswordDto changePasswordDto = new ChangePasswordDto()
                {
                    UserId = dbRes.UserId,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("1234")),
                    PasswordSalt = hmac.Key
                };

                var response = await _userRepository.ChangeOwnPassword(changePasswordDto);

                if (response.RespCd == 200)
                {
                    string baseHref = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";


                    var reset = await _userRepository.IsResetPassword(dbRes.UserId, true);

                    if (reset.ResponseCode == "200")
                    {
                        // send email code

                        string result = sendEmailViaWebApi(user.Email, baseHref, dbRes.UserName, _env);


                        if (result == "Mail Successfully Sent")
                        {
                            res.ResponseCode = "200";
                            res.ResponseMessage = reset.ResponseMessage;

                            return res;
                        }


                    }
                    else
                    {
                        res.ResponseCode = "400";
                        res.ResponseMessage = "coreo invalido";

                        return res;
                    }

                    return res;
                }

                else if (response.RespCd == 404)
                {
                    res.ResponseMessage = dbRes.ResponseMessage;
                    res.ResponseCode = "404";

                    return res;
                }

                else
                {

                    res.ResponseMessage = "error de servidor";
                    res.ResponseCode = "400";
                    //Something went wrong !!
                    return res;
                }


            }
        }
        [HttpPost]
        public async Task<Response> ForgotPassword(ForgotPassword user)
        {
            Response res = new Response();

            string PasswordHash = string.Empty;
            string PasswordSalt = string.Empty;
            var dbRes = await _userRepository.GetUserData(user.Email);

            if (dbRes ==null)
            {
                //Something went wrong!!
                res.ResponseMessage = "Algo salió mal !!";
                //res.ResponseCode = "202";
                res.ResponseCode = "400";

                return res;
            }
           else if (dbRes.ResponseCode=="-1")
            {
                res.ResponseMessage =dbRes.ResponseMessage;
                //res.ResponseCode = "201";
                res.ResponseCode = "400";

                return res;
            }
            else
            {

                //// if (dbRes != null)
                //using var hmac = new HMACSHA512();
                //PasswordHash = Convert.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(PasswordHash)));
                //PasswordSalt = (hmac.Key).ToString();

                using var hmac = new HMACSHA512();

                ChangePasswordDto changePasswordDto = new ChangePasswordDto()
                {
                    UserId = dbRes.UserId,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("1234")),
                    PasswordSalt = hmac.Key
                };

                var response = await _userRepository.ChangeOwnPassword(changePasswordDto);

                if (response.RespCd == 200)
                {
                    string baseHref = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";


                    var reset = await _userRepository.IsResetPassword(dbRes.UserId, true);

                    if (reset.ResponseCode=="200")
                    {
                        // send email code

                        string result = sendEmailViaWebApi(user.Email, baseHref, dbRes.UserName,_env);


                        if(result == "Mail Successfully Sent")
                        {
                            res.ResponseCode = "200";
                            res.ResponseMessage = reset.ResponseMessage;

                            return res;
                        }

                      
                    }
                    else
                    {
                        res.ResponseCode = "400";
                        res.ResponseMessage = "coreo invalido";

                        return res;
                    }

                    return res;
                }

                else if(response.RespCd == 404)
                {
                    res.ResponseMessage = dbRes.ResponseMessage;
                    res.ResponseCode = "404";

                    return res;
                }

                else 
                {
                    
                    res.ResponseMessage = "error de servidor";
                    res.ResponseCode = "400";
                    //Something went wrong !!
                    return res;
                }


            }
        }


        //Update profile Api
        /// <summary>
        /// Update User Details
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<UserMasterResponse>> UpdateProfile(UpdateProfile user)
        {
            
                var dbres = await _userRepository.UpdateProfile(user);
            // return dbres; 
            if (dbres.ResponseCode == "200")
            {
                string token = GenerateJWTToken(user.UserId.ToString(), Convert.ToInt16(_configuration["DbConnection:Token_Expire_in_Minutes"]));

                dbres.Token = token;
                dbres.RefreshToken = await _authRepository.RefreshToken();
             
                return Ok(new { ResponseData = dbres, ResponseMessage = dbres.ResponseMessage, ResponseCode = HttpStatusCode.OK });
            }
            return Ok(new { ResponseData = new object { }, ResponseMessage = dbres.ResponseMessage, ResponseCode = dbres.ResponseCode });



        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>

        [HttpGet]
        public async Task<ActionResult> ActiveDeactiveUser(int UserId)
        {
            if ( UserId == 0)
            {
                //User details can't be update.
                return Ok(new { ResponseCode = 201, ResponseMessage = "los detalles del usuario no se pueden actualizar", ResponseData = new {  } });
            }
            var dbres = await _userRepository.ActiveDeactiveUser(UserId);
            // return dbres; 
            if (dbres.RespCd ==1)
            {
                return Ok(new { ResponseData = dbres, ResponseMessage = dbres.RespMsg, ResponseCode = HttpStatusCode.OK });
            }
            else
            {
                return Ok(new { ResponseData = new object { }, ResponseMessage = dbres.RespMsg, ResponseCode = 201 });
            }


        }


        ////////////////////////////////////////// Forgot Password Email Code ///////////////////
        /// <summary>
        /// Send Email Method for forgot password
        /// </summary>
        /// <param name="toEmail"></param>
        /// <param name="baseURL"></param>
        /// <param name="customerName"></param>
        /// <param name="evr"></param>
        /// <returns></returns>
        public static string sendEmailViaWebApi(string toEmail, string baseURL, string customerName,IWebHostEnvironment evr)
        {
            string Body = string.Empty;
            string password = "1234";
            String newPath = evr.ContentRootPath;//HttpContext.Current.Server.MapPath("~/HtmlPages/password_recovery.html"); //Path
            string path = Path.Combine(newPath, "wwwroot/ResetPassword/password_recovery.html");

            //if (!System.IO.Directory.Exists(path))
            //{
            //    // System.IO.Directory.CreateDirectory(path); //Create directory if it doesn't exist

            //    return "Wrong Path provided.";
            //}

            Body = System.IO.File.ReadAllText
               (path);

            //Body = System.IO.File.ReadAllText
            //   (baseURL+"/wwwroot/HtmlPages/password_recovery.html");

            Body = System.IO.File.ReadAllText
               (path);

            Body = Body.Replace("#CustomerName#", customerName);
            Body = Body.Replace("#NewPassword#", password);

            MailMessage mail = new MailMessage();
            mail.To.Add(toEmail);
            mail.From = new MailAddress("HolostikBi@holostik.com");
            mail.Subject = "Mezcal Account Reset  Password";
            mail.IsBodyHtml = true;
            mail.Body = Body;
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.office365.com"; //Or Your SMTP Server Address
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential("HolostikBi@holostik.com", "Baho9485"); // ***use valid credentials***
            smtp.EnableSsl = true;
            smtp.Send(mail);
            return "Mail Successfully Sent";



        }

    }
}

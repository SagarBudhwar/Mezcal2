using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mezcal.Models
{
    public class AuthResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int RoleId { get; set; }
        public int AccessType { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }
        public string UserType { get; set; }
        public bool IsActive { get; set; }
        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
        public int RespCd { get; set; }
        public string RespMsg { get; set; }
    }
    public class AuthMobileResponse
    {

        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
        //  public string ReferenceID { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }
        public string Mobile { get; set; }


        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string UserType { get; set; }
     

        public string DeviceType { get; set; }
      
        public string ResponseCode { get; set; }
        public string ResponseMessage { get; set; }


    }

    public class GetPagesWithRoleResponse
    {
        public int MapRolePageId { get; set; }
        public int PageId { get; set; }
        public int RoleId { get; set; }
    }
}

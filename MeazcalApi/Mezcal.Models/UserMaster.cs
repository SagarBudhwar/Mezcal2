using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Mezcal.Models
{
    public class UserMasterResponse
    {
    
         public string Token { get; set; }
        public string RefreshToken { get; set; }
   
         public int UserId { get; set; }
        public string UserName { get; set; }
        
        [Required]
        public string Email { get; set; }
        public string Mobile { get; set; }
        //public int UserType { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        // public string ProfileImage { get; set; }

        public string UserType { get; set; }
       // public string ProfileImage { get; set; }

        //public string UsrType { get; set; }
        //public string UsrType { get; set; }
        //public string ProfileImage { get; set; }

        public string DeviceType { get; set; }
        //public int SignUpType { get; set; }


        //public string CreatedDate { get; set; }
        public string ResponseMessage { get; set; }
        public string ResponseCode { get; set; }


    }

     
    public class UserOldPasswordResponse
    {
        public int UserId { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int RespCd { get; set; }
        public string RespMsg { get; set; }
    }
   

    public class UserProfileResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public string UserType { get; set; }
    }

    public class GetAllUsersList
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int UserType { get; set; }
        public string UserTypeName { get; set; }
        public string DeviceType { get; set; }
        public bool IsActive { get; set; }
        public string InActiveReason { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedDate { get; set; }
        public int TotalRows { get; set; }
    }

    public class UserTypeResponse
    {
        public int Id { get; set; }
        public string UserType { get; set; }
        //public string AccessType { get; set; }
    }

    }

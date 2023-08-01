using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Mezcal.Dtos
{
    public class ChangeOwnPassword
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "User ID is required")]
        public int UserId { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Old Password is required")]
        public string OldPassword { get; set; }
        [Required(AllowEmptyStrings = false, ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class ChangePasswordDto
    {
        public int UserId { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
    public class UserMasterDto
    {
        public int UserId { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string ReferenceID { get; set; }
        public string Username { get; set; }
        //[Required]
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        [Required]
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public int UserType { get; set; }

        public string UsrType { get; set; }
        public string ProfileImage { get; set; }
        public string DeviceType { get; set; }
        public int SignUpType { get; set; }
        public bool? IsActive { get; set; }
        public string InActiveReason { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? CreatedDt { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDt { get; set; }
        public string Salt { get; set; }
        public string CreatedDate { get; set; }
        public bool IsResetPassword { get; set; }

        public string ResponseCode { get; set; }
    }
    public class UpdateProfile
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string MobNo { get; set; }
    }
    public class ProductCategoryRequest
    {
        public int? ID { get; set; }
        public string ProductCategory { get; set; }
        public int UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
        public int CreatedBy { get; set; }
        public string InActiveReason { get; set; }
    }
    public class UserDto:UserDtoExtended
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
        public int RoleId { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int UserType { get; set; }
        public string DeviceType { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class UserDtoExtended
    {
        public int UserId { get; set; }
        public bool IsChangePassword { get; set; }
        public string InActiveReason { get; set; }
    }
    public class ForgotPassword
    {
        [Required]
        public string Email { get; set; }
    }



}

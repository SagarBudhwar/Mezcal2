using System;
using System.ComponentModel.DataAnnotations;

namespace Mezcal.Dtos
{
    public class LoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class LoginDtoMobile
    {
        [Required]
        public string Email { get; set; }
        public string MobileNo { get; set; }
        public string Password { get; set; }
    }
}

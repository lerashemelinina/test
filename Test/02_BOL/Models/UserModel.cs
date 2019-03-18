using System.ComponentModel.DataAnnotations;

namespace _02_BOL
{
    public class UserModel
    {
        [Required, MinLength(2), MaxLength(50)]
        public string UserName { get; set; }

        [Required, EmailValidation]
        public string Email { get; set; }

        [Required, MinLength(3), MaxLength(50)]
        public string Password { get; set; }
    }
}

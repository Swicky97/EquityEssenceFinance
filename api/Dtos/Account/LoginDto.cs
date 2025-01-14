using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Account;

public class LoginDTO
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}

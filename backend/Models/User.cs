using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class User
{
    public int? User_id { get; set; }

    [Required(ErrorMessage = "Username is required")]
    [StringLength(15, MinimumLength = 3, ErrorMessage = "Username must be between 0 and 15 characters!")]
    public string? Username { get; set; }
    
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
    ErrorMessage = "Password must have at least one uppercase letter, one number, and one special character")]
    [StringLength(50, MinimumLength = 8, ErrorMessage = "Password must be at least 8 characters long")]
    public string? Password { get; set; }

    [Required]
    [StringLength(400, MinimumLength = 0, ErrorMessage = "Biography must be between 0 and 400 characters!")]
    public string? Biography { get; set; }

    public string? Nickname { get; set; }

    [Required]
    [Url]
    public string? Pfp {get; set;}
}

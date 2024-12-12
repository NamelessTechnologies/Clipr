using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class EdittedUser
{
    public int? User_id { get; set; }

    [Required]
    [StringLength(15, MinimumLength = 3, ErrorMessage = "Username must be between 0 and 15 characters!")]
    public string? Username { get; set; }
    
    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    public string? Password { get; set; }

    [Required]
    [StringLength(400, MinimumLength = 0, ErrorMessage = "Biography must be between 0 and 400 characters!")]
    public string? Biography { get; set; }

    public string? Nickname { get; set; }

    [Required]
    [Url]
    public string? Pfp {get; set;}
}

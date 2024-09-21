namespace backend.Models;

public class User
{
    public int? User_id { get; set; }
    public string? Username { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
    public string? Biography { get; set; }
    public string? Nickname { get; set; }

    public string? Pfp {get; set;}
}

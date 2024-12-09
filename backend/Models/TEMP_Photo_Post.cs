namespace backend.Models;

public class TEMP_Photo_Post
{
    public int? UserID { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public byte[]? PhotoData { get; set; }

    public string? Username { get; set; }

    public string? Pfp_Url { get; set; }

}
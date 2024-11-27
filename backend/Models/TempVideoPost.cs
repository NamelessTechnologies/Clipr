namespace backend.Models;

public class TempVideoPost
{
    public int? PostID { get; set; }

    public int? UserID { get; set; }

    public string? Title { get; set; }

    public string? Content { get; set; }

    public DateTime? DatePosted { get; set; }

    public IFormFile? PhotoData { get; set; }

}

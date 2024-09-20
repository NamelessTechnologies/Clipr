namespace backend.Models;

public class Post
{
    public int? PostID { get; set; }

    public int? UserID { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTime? DatePosted { get; set; }

    public string? MediaType { get; set; }

}

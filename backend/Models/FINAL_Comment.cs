namespace backend.Models;

public class FINAL_Comment
{
    public int? CommentID { get; set; }

    public int? ParentID { get; set; }

    public int? PostID { get; set; }

    public int? UserID { get; set; }

    public string? Content { get; set; }

    public string? Username { get; set; }

    public string? PFP { get; set; }

    public int? LikeCount { get; set; }

    public bool? Liked { get; set; }

}
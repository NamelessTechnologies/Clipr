using Microsoft.Identity.Client;

namespace backend.Models;

public class Comment
{
    public int? ID { get; set; }

    public int? ParentID { get; set; }

    public int? PostID { get; set; }

    public int? UserID { get; set; }

    public string? Content { get; set; }
}

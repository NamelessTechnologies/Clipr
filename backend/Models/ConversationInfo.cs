namespace backend.Models;

public class ConversationInfo
{
    public int? Conversation_Id { get; set; }

    public int? Current_User_Id { get; set; }

    public int? Other_User_Id { get; set; }

    public string? Other_User_Nickname { get; set; }

    public string? Other_User_Pfp  { get; set; }

    public string? Latest_Message { get; set; }

    public DateTime? Latest_Message_Date { get; set; }

}

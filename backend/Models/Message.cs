namespace backend.Models;

public class Message
{
    public int? Id { get; set; }

    public int? Convo_id { get; set; }

    public string? Content { get; set; }

    public DateTime? Datesent { get; set; }

    public int? User_id { get; set; }

}

using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Follower
    {
        [JsonPropertyName("userID")]
        public int? UserID { get; set; }

        [JsonPropertyName("username")]
        public string? Username { get; set; }

        [JsonPropertyName("nickname")]
        public string? Nickname { get; set; }

        [JsonPropertyName("pfP_URL")]
        public string? PFP_URL { get; set; }
    }
}

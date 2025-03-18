using System.Text.Json.Serialization;

namespace Neighborly.Jobs.Models
{
    public class UpdateUser
    {
        [JsonPropertyName("fullName")]
        public string? FullName { get; set; }

        [JsonPropertyName("address")]
        public string? Address { get; set; }

        [JsonPropertyName("phone")]
        public string? Phone { get; set; }
    }
}

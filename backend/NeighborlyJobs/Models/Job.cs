using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace Neighborly.Jobs.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [JsonPropertyName("userId")]
        public string UserId { get; set; } = string.Empty;

        [JsonPropertyName("jobCategory")]
        public string JobCategory { get; set; } = "Other"; // Default category

        [JsonPropertyName("jobDescription")]
        public string JobDescription { get; set; } = string.Empty;

        [JsonPropertyName("address")]
        public string Address { get; set; } = string.Empty;

        [JsonPropertyName("phone")]
        public string Phone { get; set; } = string.Empty;

        [JsonPropertyName("postedAt")]
        public DateTime PostedAt { get; set; } = DateTime.UtcNow;
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
using BCrypt.Net;

namespace Neighborly.Jobs.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [JsonPropertyName("fullName")]
        public string? FullName { get; set; }

        [JsonPropertyName("email")]
        public required string Email { get; set; }
        
        [JsonPropertyName("passwordHash")]  // ✅ Ensures JSON maps to `passwordHash`
        public required string PasswordHash { get; set; }

        // ✅ Adding Address Field
        [JsonPropertyName("address")]
        public string? Address { get; set; } = "";

        // ✅ Adding Phone Field
        [JsonPropertyName("phone")]
        public string? Phone { get; set; } = "";

        public void SetPassword(string password)
        {
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool ValidatePassword(string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, PasswordHash);
        }
    }
}

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

        public required string Email { get; set; }

        [JsonPropertyName("passwordHash")]  // ✅ Ensures JSON maps to `passwordHash`
        public required string PasswordHash { get; set; }

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

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using BCrypt.Net;

namespace Neighborly.Jobs.Models
{
    public class Worker
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
        public required string SsnId { get; set; }

        // New Fields for Worker Profile
        public string? Address { get; set; }
        public string? Contact { get; set; }
        public decimal HourlyRate { get; set; } = 45.0m; // Default price
        public string Summary { get; set; } = "Experienced and dedicated worker.";
        public bool Availability { get; set; } = true;
        public int CompletedJobs { get; set; } = 0;
        public double Rating { get; set; } = 4.5; // Hardcoded for now

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

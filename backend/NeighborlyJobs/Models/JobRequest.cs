using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Neighborly.Jobs.Models
{
    public class JobRequest
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }  // ✅ MongoDB Job Request ID

        public required string WorkerId { get; set; }  // ✅ Worker receiving the job request
        public string? UserId { get; set; }  // ✅ User who posted the job (assigned in API)
        
        public required string FullName { get; set; } 
        public required string Email { get; set; } 
        public required string Contact { get; set; } 
        public required string Address { get; set; } 
        
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public required DateTime JobDateTime { get; set; }  // ✅ Required field
        
        public required string JobDescription { get; set; } 
        public required string JobPostStatus { get; set; }  // ✅ "filled" or "unfilled"
    }
}

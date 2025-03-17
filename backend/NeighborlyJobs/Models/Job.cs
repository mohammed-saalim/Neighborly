using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        // public JobCategory Category { get; set; }
        public DateTime DatePosted { get; set; }
        public bool IsFilled { get; set; }
        public decimal Price { get; set; }
        public required string Zipcode { get; set; }

        public string Address { get; set; }

        // New fields for tasks
        public string? TaskSize { get; set; } // Small, Medium, Large
        public string? ServiceType { get; set; } // Moving, Cleaning, etc.

        public string Unit { get; set; }

        // Specific to Moving tasks
        public string? PickupLocation { get; set; }
        public string? DropoffLocation { get; set; }
        public int? NumItems { get; set; } // Only for moving
    }

    public class JobCategory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<string>? Skills { get; set; } 
    }

     public class JobPoster
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    
}
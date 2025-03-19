using System.Text.Json.Serialization;

namespace Neighborly.Jobs.Models
{
    public class UpdateWorkerProfile
    {
        public string? Address { get; set; }
        public string? Contact { get; set; }
        public decimal? HourlyRate { get; set; }
        public string? Summary { get; set; }
        public bool? Availability { get; set; }
    }
}

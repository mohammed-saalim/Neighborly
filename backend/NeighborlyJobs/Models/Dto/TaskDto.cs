namespace Neighborly.Jobs.DTOs
{
    public class TaskDto
    {
        public string Title { get; set; } 
        public string Description { get; set; }
        public string Address { get; set; }
        public string Zipcode { get; set; }
        public string TaskSize { get; set; }
        public string ServiceType { get; set; } // e.g. "Moving", "Cleaning"

        public string Unit { get; set; }

        // Moving-specific fields
        public string? PickupLocation { get; set; }
        public string? DropoffLocation { get; set; }
        public int? NumItems { get; set; }
    }
}

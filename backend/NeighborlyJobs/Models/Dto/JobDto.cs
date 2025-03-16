using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.DTOs
{
    public class JobDto
    {
        public string Id { get; set; }  = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; }  = string.Empty;
        public DateTime DatePosted { get; set; } = DateTime.Now;
        // public JobCategoryDto Category { get; set; } = new JobCategoryDto();
        public decimal Price { get; set; } = 0;
        public string? Zipcode { get; set; }

    }

}
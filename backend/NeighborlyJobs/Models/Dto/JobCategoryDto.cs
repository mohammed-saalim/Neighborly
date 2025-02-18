using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.DTOs
{
    public class JobCategoryDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string>? Skills { get; set; } 
 
    }
}
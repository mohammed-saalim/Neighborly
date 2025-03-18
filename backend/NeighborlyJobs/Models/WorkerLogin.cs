namespace Neighborly.Jobs.Models
{
    public class WorkerLogin
    {
        public required string Email { get; set; }
        public required string PasswordHash { get; set; }
    }
}

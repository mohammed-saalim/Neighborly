using MongoDB.Driver;
using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.ServiceProvider
{
    public class JobServiceProvider
    {
        private readonly IMongoCollection<Job> _jobs;

        public JobServiceProvider(DbServiceProvider dbServiceProvider)
        {
            _jobs = dbServiceProvider.Jobs;
        }

        // ✅ Insert a new job into the database
        public async Task InsertJob(Job job) =>
            await _jobs.InsertOneAsync(job);

        // ✅ Retrieve all jobs
        public List<Job> GetAllJobs() =>
            _jobs.Find(_ => true).ToList();

        // ✅ Retrieve a specific job by ID
        public Job? GetJobById(string jobId) =>
            _jobs.Find(j => j.Id == jobId).FirstOrDefault();

        // ✅ Retrieve jobs posted by a specific user
        public List<Job> GetJobsByUserId(string userId) =>
            _jobs.Find(j => j.UserId == userId).ToList();
    }
}

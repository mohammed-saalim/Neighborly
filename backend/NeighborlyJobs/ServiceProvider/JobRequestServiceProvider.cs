using MongoDB.Driver;
using Neighborly.Jobs.Models;
using System.Collections.Generic;

namespace Neighborly.Jobs.ServiceProvider
{
    public class JobRequestServiceProvider
    {
        private readonly IMongoCollection<JobRequest> _jobRequests;

        public JobRequestServiceProvider(DbServiceProvider dbServiceProvider)
        {
            _jobRequests = dbServiceProvider.JobRequests;
        }

        // ✅ Insert a new job request
        public void InsertJobRequest(JobRequest jobRequest) =>
            _jobRequests.InsertOne(jobRequest);

        // ✅ Get job requests for a worker
        public List<JobRequest> GetJobRequestsForWorker(string workerId) =>
            _jobRequests.Find(jr => jr.WorkerId == workerId).ToList();

        // ✅ Get job requests sent by a user
        public List<JobRequest> GetJobRequestsByUser(string userId) =>
            _jobRequests.Find(jr => jr.UserId == userId).ToList();
    }
}

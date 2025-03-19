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

        // ✅ Accept Job Request → Changes status to "in progress"
        public bool AcceptJobRequest(string jobRequestId)
        {
            var update = Builders<JobRequest>.Update.Set(jr => jr.JobPostStatus, "in progress");
            var result = _jobRequests.UpdateOne(jr => jr.Id == jobRequestId, update);
            return result.ModifiedCount > 0;
        }

        // ✅ Reject Job Request → Changes status to "rejected"
        public bool RejectJobRequest(string jobRequestId)
        {
            var update = Builders<JobRequest>.Update.Set(jr => jr.JobPostStatus, "rejected");
            var result = _jobRequests.UpdateOne(jr => jr.Id == jobRequestId, update);
            return result.ModifiedCount > 0;
        }

        // ✅ Mark Job as Completed → Changes status to "completed"
        public bool CompleteJobRequest(string jobRequestId)
        {
            var update = Builders<JobRequest>.Update.Set(jr => jr.JobPostStatus, "completed");
            var result = _jobRequests.UpdateOne(jr => jr.Id == jobRequestId, update);
            return result.ModifiedCount > 0;
        }

        // ✅ Get In-Progress Jobs for Worker
        public List<JobRequest> GetInProgressJobsForWorker(string workerId) =>
            _jobRequests.Find(jr => jr.WorkerId == workerId && jr.JobPostStatus == "in progress").ToList();

        // ✅ Get Completed Jobs for Worker
        public List<JobRequest> GetCompletedJobsForWorker(string workerId) =>
            _jobRequests.Find(jr => jr.WorkerId == workerId && jr.JobPostStatus == "completed").ToList();

        // ✅ Get Completed Jobs for User
        public List<JobRequest> GetCompletedJobsForUser(string userId) =>
            _jobRequests.Find(jr => jr.UserId == userId && jr.JobPostStatus == "completed").ToList();
    }
}

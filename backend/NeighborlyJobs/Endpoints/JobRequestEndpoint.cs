using Neighborly.Jobs.Models;
using Neighborly.Jobs.ServiceProvider;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Neighborly.Jobs.Endpoints
{
    public static class JobRequestEndpoints
    {
        public static void MapJobRequestEndpoints(this IEndpointRouteBuilder routes)
        {
            // ✅ Send a Job Request to a Worker
            routes.MapPost("/api/jobrequests", async (HttpContext http, JobRequestServiceProvider _jobRequestService, JobRequest jobRequest) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                Console.WriteLine($"Received Job Request for Worker ID: {jobRequest.WorkerId}");
                Console.WriteLine($"Extracted User ID from Token: {userId}");

                jobRequest.UserId = userId;  // ✅ Assign the logged-in user ID
                _jobRequestService.InsertJobRequest(jobRequest);
                
                return Results.Created($"/api/jobrequests/{jobRequest.Id}", jobRequest);
            }).RequireAuthorization();

            // ✅ Get Job Requests sent by the logged-in User
            routes.MapGet("/api/jobrequest/user", [Authorize] async (HttpContext http, JobRequestServiceProvider _jobRequestService) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var jobRequests = _jobRequestService.GetJobRequestsByUser(userId);
                return Results.Ok(jobRequests);
            });

            // ✅ Get Job Requests received by the logged-in Worker
            routes.MapGet("/api/jobrequest/worker", [Authorize] async (HttpContext http, JobRequestServiceProvider _jobRequestService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

                var jobRequests = _jobRequestService.GetJobRequestsForWorker(workerId);
                return Results.Ok(jobRequests);
            });

            // ✅ Accept Job Request (Worker)
            routes.MapPut("/api/jobrequests/{jobRequestId}/accept", [Authorize] (HttpContext http, string jobRequestId, JobRequestServiceProvider _jobRequestService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

                var success = _jobRequestService.AcceptJobRequest(jobRequestId);
                return success ? Results.Ok("Job request accepted and now in progress.") : Results.NotFound("Job request not found.");
            });

            // ✅ Reject Job Request (Worker)
            routes.MapPut("/api/jobrequests/{jobRequestId}/reject", [Authorize] (HttpContext http, string jobRequestId, JobRequestServiceProvider _jobRequestService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

                var success = _jobRequestService.RejectJobRequest(jobRequestId);
                return success ? Results.Ok("Job request rejected.") : Results.NotFound("Job request not found.");
            });

            // ✅ Complete Job Request (User Confirms Completion)
            routes.MapPut("/api/jobrequests/{jobRequestId}/complete", [Authorize] (HttpContext http, string jobRequestId, JobRequestServiceProvider _jobRequestService) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var success = _jobRequestService.CompleteJobRequest(jobRequestId);
                return success ? Results.Ok("Job marked as completed.") : Results.NotFound("Job request not found.");
            });

            // ✅ Get In-Progress Jobs (Worker)
            routes.MapGet("/api/jobrequests/worker/inprogress", [Authorize] (HttpContext http, JobRequestServiceProvider _jobRequestService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

                var jobs = _jobRequestService.GetInProgressJobsForWorker(workerId);
                return Results.Ok(jobs);
            });

            // ✅ Get Completed Jobs (Worker)
            routes.MapGet("/api/jobrequests/worker/completed", [Authorize] (HttpContext http, JobRequestServiceProvider _jobRequestService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

                var jobs = _jobRequestService.GetCompletedJobsForWorker(workerId);
                return Results.Ok(jobs);
            });

            // ✅ Get Completed Jobs (User)
            routes.MapGet("/api/jobrequests/user/completed", [Authorize] (HttpContext http, JobRequestServiceProvider _jobRequestService) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId)) return Results.Unauthorized();

                var jobs = _jobRequestService.GetCompletedJobsForUser(userId);
                return Results.Ok(jobs);
            });

        }
    }
}

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
        }
    }
}

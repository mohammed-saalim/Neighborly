using Neighborly.Jobs.Models;
using Neighborly.Jobs.ServiceProvider;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Neighborly.Jobs.Endpoints
{
    public static class JobEndpoints
    {
        public static void MapJobEndpoints(this IEndpointRouteBuilder routes)
        {
            // ✅ Create a new job posting
            routes.MapPost("/api/jobs", [Authorize] async (HttpContext http, JobServiceProvider _jobService, Job job) =>
            {
                // ✅ Extract user ID from JWT token
                var userId = http.User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                             ?? http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Fallback

                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("❌ User ID not found in JWT token.");
                    return Results.Unauthorized();
                }

                Console.WriteLine($"✅ Extracted User ID: {userId}");

                job.UserId = userId;
                job.PostedAt = DateTime.UtcNow;

                await _jobService.InsertJob(job);
                return Results.Created($"/api/jobs/{job.Id}", job);
            });

            // ✅ Retrieve all jobs
            routes.MapGet("/api/jobs", async (JobServiceProvider _jobService) =>
            {
                var jobs = _jobService.GetAllJobs();
                return Results.Ok(jobs);
            });

            // ✅ Retrieve a specific job by ID
            routes.MapGet("/api/jobs/{jobId}", async (string jobId, JobServiceProvider _jobService) =>
            {
                var job = _jobService.GetJobById(jobId);
                return job is not null ? Results.Ok(job) : Results.NotFound("Job not found");
            });

            // ✅ Retrieve jobs posted by the logged-in user
            routes.MapGet("/api/jobs/my-jobs", [Authorize] async (HttpContext http, JobServiceProvider _jobService) =>
            {
                var userId = http.User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value 
                             ?? http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value; // Fallback

                if (string.IsNullOrEmpty(userId))
                {
                    Console.WriteLine("❌ User ID not found in JWT token.");
                    return Results.Unauthorized();
                }

                Console.WriteLine($"✅ Extracted User ID: {userId}");

                var jobs = _jobService.GetJobsByUserId(userId);
                return Results.Ok(jobs);
            });
        }
    }
}

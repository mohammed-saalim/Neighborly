using Neighborly.Jobs.Models;
using Neighborly.Jobs.ServiceProvider;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Neighborly.Auth.RequestHandler;

namespace Neighborly.Jobs.Endpoints
{
    public static class WorkerEndpoints
    {
        public static void MapWorkerEndpoints(this IEndpointRouteBuilder routes)
        {
            // ✅ EXISTING AUTH ROUTES (DO NOT REMOVE)
            routes.MapPost("/api/auth/worker/register", (Worker worker, WorkerAuthRequestHandler handler) =>
                handler.Register(worker));

            routes.MapPost("/api/auth/worker/login", (WorkerLogin worker, WorkerAuthRequestHandler handler) =>
                handler.Login(worker));

            // ✅ NEW ENDPOINTS START HERE

            // ✅ GET Available Workers (Recommendations)
            routes.MapGet("/api/workers/recommendations", async (WorkerServiceProvider _workerService) =>
            {
                var workers = _workerService.GetAllWorkers();
                return Results.Ok(workers);
            });

            // ✅ GET Logged-in Worker Profile
            routes.MapGet("/api/worker/profile", [Authorize] (HttpContext http, WorkerServiceProvider _workerService) =>
            {
                var workerId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (workerId == null) return Results.Unauthorized();

                var worker = _workerService.GetWorkerById(workerId);
                if (worker == null) return Results.NotFound("Worker not found");

                return Results.Ok(worker);
            });

            // ✅ PUT Update Worker Profile
            // ✅ Update Worker Profile
        routes.MapPut("/api/worker/profile", [Authorize] async (HttpContext http, WorkerServiceProvider _workerService, UpdateWorkerProfile updatedWorker) =>
        {
            var workerId = http.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(workerId)) return Results.Unauthorized();

            var worker = _workerService.GetWorkerById(workerId);
            if (worker == null) return Results.NotFound("Worker not found");

            // ✅ Apply updates only if provided
            if (!string.IsNullOrEmpty(updatedWorker.Address)) worker.Address = updatedWorker.Address;
            if (!string.IsNullOrEmpty(updatedWorker.Contact)) worker.Contact = updatedWorker.Contact;
            if (updatedWorker.HourlyRate.HasValue) worker.HourlyRate = updatedWorker.HourlyRate.Value;
            if (!string.IsNullOrEmpty(updatedWorker.Summary)) worker.Summary = updatedWorker.Summary;
            if (updatedWorker.Availability.HasValue) worker.Availability = updatedWorker.Availability.Value;

            _workerService.UpdateWorker(worker);

            return Results.Ok("Worker profile updated successfully.");
        });

        }
    }
}

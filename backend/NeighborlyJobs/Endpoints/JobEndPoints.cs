using Neighborly.Jobs.RequestHandler;
using Neighborly.Jobs.DTOs;

namespace Neighborly.Jobs.Endpoints
{
    public static class JobEndpoints
    {
        public static void MapJobEndpoints(this IEndpointRouteBuilder routes)
        {
            routes.MapGet("/jobs", async (JobRequestHandler handler) => await handler.GetJobsAsync());
            routes.MapPost("/jobCategory", async (JobCategoryDto jobDto, JobRequestHandler handler) => await handler.AddJobCategoryAsync(jobDto));
            routes.MapPost("/jobs", async (JobDto jobDto, JobRequestHandler handler) => await handler.AddJobAsync(jobDto));
            routes.MapGet("/", () => "Test Endpoint");
            routes.MapPost("/tasks", async (TaskDto taskDto, JobRequestHandler handler) => await handler.AddTaskAsync(taskDto));

        }
    }
}

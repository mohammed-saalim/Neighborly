using Neighborly.Auth.RequestHandler;
using Neighborly.Jobs.Models;

namespace Neighborly.Auth.Endpoints
{
    public static class WorkerAuthEndpoints
    {
        public static void MapWorkerAuthEndpoints(this IEndpointRouteBuilder routes)
        {
            routes.MapPost("/api/auth/worker/register", (Worker worker, WorkerAuthRequestHandler handler) =>
                handler.Register(worker));

            routes.MapPost("/api/auth/worker/login", (WorkerLogin worker, WorkerAuthRequestHandler handler) =>
                handler.Login(worker));

        }
    }
}

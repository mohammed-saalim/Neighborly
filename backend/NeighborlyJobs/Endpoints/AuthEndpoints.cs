using Neighborly.Auth.RequestHandler;
using Neighborly.Jobs.Models;

namespace Neighborly.Auth.Endpoints
{
    public static class AuthEndpoints
    {
        public static void MapAuthEndpoints(this IEndpointRouteBuilder routes)
        {
            routes.MapPost("/api/auth/register", (User user, AuthRequestHandler handler) =>
                handler.Register(user));

            routes.MapPost("/api/auth/login", (User user, AuthRequestHandler handler) =>
                handler.Login(user));

            routes.MapGet("/api/auth/protected", (AuthRequestHandler handler) =>
                handler.ProtectedRoute()).RequireAuthorization();
        }
    }
}

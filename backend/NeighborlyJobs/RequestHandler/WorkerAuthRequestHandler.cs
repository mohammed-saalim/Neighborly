using Neighborly.Jobs.Models;  // ✅ Import Worker model
using Neighborly.Jobs.ServiceProvider;  // ✅ Import WorkerServiceProvider
using Neighborly.Auth.Middleware;  // ✅ Import JwtService
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;  // ✅ Required for [FromBody] and API endpoints



namespace Neighborly.Auth.RequestHandler // ✅ CORRECT
{
    public class WorkerAuthRequestHandler
    {
        private readonly WorkerServiceProvider _workerService;
        private readonly JwtService _jwtService;

        public WorkerAuthRequestHandler(WorkerServiceProvider workerService, JwtService jwtService)
        {
            _workerService = workerService;
            _jwtService = jwtService;
        }

    public IResult Register([FromBody] Worker worker)
        {
            if (_workerService.GetWorkerByEmail(worker.Email) != null)
                return Results.BadRequest("Worker already exists.");

            // Ensure that we're hashing the password before saving
            worker.SetPassword(worker.PasswordHash);
            _workerService.InsertWorker(worker);

            return Results.Ok("Worker registered successfully.");
        }

        public IResult Login(WorkerLogin workerLogin)
        {
            var dbWorker = _workerService.GetWorkerByEmail(workerLogin.Email);
            if (dbWorker == null || !dbWorker.ValidatePassword(workerLogin.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var token = _jwtService.GenerateToken(dbWorker.Id!, dbWorker.Email);
            return Results.Ok(new { token });
        }


    }
}

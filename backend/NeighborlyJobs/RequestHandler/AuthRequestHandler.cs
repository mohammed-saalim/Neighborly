using Neighborly.Jobs.ServiceProvider;
using Neighborly.Jobs.Models;
using Neighborly.Auth.Middleware;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace Neighborly.Auth.RequestHandler
{
    public class AuthRequestHandler
    {
        private readonly UserServiceProvider _userService;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;

        public AuthRequestHandler(UserServiceProvider userService, JwtService jwtService, IConfiguration configuration)
        {
            _userService = userService;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        public IResult Register(User user)
        {
            if (user == null)
                return Results.BadRequest("Invalid request data."); // ✅ Handle null case

            if (_userService.GetUserByEmail(user.Email) != null)
                return Results.BadRequest("User already exists.");

            user.SetPassword(user.PasswordHash);
            _userService.InsertUser(user);

            return Results.Ok("User registered successfully.");
        }


        public IResult Login(UserLogin user)
        {
            var dbUser = _userService.GetUserByEmail(user.Email);
            if (dbUser == null || !_userService.VerifyPassword(user.PasswordHash, dbUser.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var token = _jwtService.GenerateToken(dbUser.Id!, dbUser.Email);
            return Results.Ok(new { token });
        }

        public IResult LoginAsync(User user) // 🔹 Removed 'async' keyword
        {
            var dbUser = _userService.GetUserByEmail(user.Email); // 🔹 Removed 'await' because it's not async
            if (dbUser == null || !_userService.VerifyPassword(user.PasswordHash, dbUser.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, dbUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = _jwtService.GenerateToken(dbUser.Id!, dbUser.Email); // 🔹 No more type mismatch
            return Results.Ok(new { token });
        }

        public IResult ProtectedRoute()
        {
            return Results.Ok(new { message = "This is a protected route, accessible only with a valid JWT." });
        }
    }
}

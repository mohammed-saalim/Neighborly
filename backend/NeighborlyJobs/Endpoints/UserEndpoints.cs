using Neighborly.Jobs.Models;
using Neighborly.Jobs.ServiceProvider;
using Neighborly.Jobs.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Neighborly.Auth.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
        {
            routes.MapGet("/api/user/profile", [Authorize] (HttpContext http, UserServiceProvider _userService) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return Results.Unauthorized();

                var user = _userService.GetUserById(userId);
                if (user == null) return Results.NotFound("User not found");

                return Results.Ok(new
                {
                    fullName = user.FullName,
                    email = user.Email,
                    address = user.Address,
                    phone = user.Phone
                });
            });

            // ✅ NEW: Profile Update Endpoint (Using DTO)
            routes.MapPut("/api/user/profile", [Authorize] async (HttpContext http, UserServiceProvider _userService, UpdateUser updatedUser) =>
            {
                var userId = http.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (userId == null) return Results.Unauthorized();

                var existingUser = _userService.GetUserById(userId);
                if (existingUser == null) return Results.NotFound("User not found");

                // ✅ Ensure null values do not overwrite existing data
                var newFullName = !string.IsNullOrEmpty(updatedUser.FullName) ? updatedUser.FullName : existingUser.FullName;
                var newAddress = !string.IsNullOrEmpty(updatedUser.Address) ? updatedUser.Address : existingUser.Address;
                var newPhone = !string.IsNullOrEmpty(updatedUser.Phone) ? updatedUser.Phone : existingUser.Phone;

                _userService.UpdateUserProfile(userId, newFullName, newAddress, newPhone);
                
                return Results.Ok("Profile updated successfully.");
            });
        }
    }
}

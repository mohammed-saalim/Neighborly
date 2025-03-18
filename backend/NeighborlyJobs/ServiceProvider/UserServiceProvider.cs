using MongoDB.Driver;
using Neighborly.Jobs.Models;
using Neighborly.Jobs.ServiceProvider;

namespace Neighborly.Jobs.ServiceProvider
{
    public class UserServiceProvider
    {
        private readonly IMongoCollection<User> _users;

        public UserServiceProvider(DbServiceProvider dbServiceProvider)
        {
            _users = dbServiceProvider.Users;
        }

        public User? GetUserByEmail(string email) =>
            _users.Find(u => u.Email == email).FirstOrDefault();

        public User? GetUserById(string userId) => // ✅ ADDED THIS METHOD
            _users.Find(u => u.Id == userId).FirstOrDefault();

        public void InsertUser(User user) =>
            _users.InsertOne(user);

        public bool VerifyPassword(string inputPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, storedHash);
        }

        public void UpdateUserProfile(string userId, string fullName, string? address, string? phone)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, userId);
            var update = Builders<User>.Update
                .Set(u => u.FullName, fullName)
                .Set(u => u.Address, address ?? "") // ✅ Default to empty string if null
                .Set(u => u.Phone, phone ?? ""); // ✅ Default to empty string if null

            _users.UpdateOne(filter, update);
        }


    }
}

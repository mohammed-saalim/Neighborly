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


        public void InsertUser(User user) =>
            _users.InsertOne(user);

        public bool VerifyPassword(string inputPassword, string storedHash)
        {
            return BCrypt.Net.BCrypt.Verify(inputPassword, storedHash);
        }
    
    }
}

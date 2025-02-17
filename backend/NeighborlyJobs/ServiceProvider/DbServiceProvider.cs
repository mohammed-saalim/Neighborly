using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.ServiceProvider
{
    public class DbServiceProvider
    {
        private readonly IMongoDatabase _database;

        public DbServiceProvider(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDbSettings:ConnectionString"]);
            _database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
        }

        public IMongoCollection<Job> Jobs => _database.GetCollection<Job>("Jobs");
        
        public IMongoCollection<JobCategory> JobCategory => _database.GetCollection<JobCategory>("JobCategory");

        public IMongoCollection<JobPoster> JobPosters => _database.GetCollection<JobPoster>("JobPosters");
    }
}

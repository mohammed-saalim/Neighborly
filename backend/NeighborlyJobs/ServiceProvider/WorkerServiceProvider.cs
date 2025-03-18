using MongoDB.Driver;
using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.ServiceProvider
{
    public class WorkerServiceProvider
    {
        private readonly IMongoCollection<Worker> _workers;

        public WorkerServiceProvider(DbServiceProvider dbServiceProvider)
        {
            _workers = dbServiceProvider.Workers;
        }

        public Worker? GetWorkerByEmail(string email) =>
            _workers.Find(w => w.Email == email).FirstOrDefault();

        public void InsertWorker(Worker worker) =>
            _workers.InsertOne(worker);
    }
}

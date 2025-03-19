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

        public Worker? GetWorkerById(string workerId) =>
            _workers.Find(w => w.Id == workerId).FirstOrDefault();

        public List<Worker> GetAllWorkers() =>
            _workers.Find(_ => true).ToList();

        public void UpdateWorkerProfile(string workerId, string? address, string? contact, decimal hourlyRate, string summary, bool availability)
        {
            var update = Builders<Worker>.Update
                .Set(w => w.Address, address)
                .Set(w => w.Contact, contact)
                .Set(w => w.HourlyRate, hourlyRate)
                .Set(w => w.Summary, summary)
                .Set(w => w.Availability, availability);

            _workers.UpdateOne(w => w.Id == workerId, update);
        }

        public void UpdateWorker(Worker worker)
        {
            var filter = Builders<Worker>.Filter.Eq(w => w.Id, worker.Id);
            _workers.ReplaceOne(filter, worker);
        }

    }
}

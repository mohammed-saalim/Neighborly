using Neighborly.Jobs.Models;
using Neighborly.Jobs.DTOs;
using AutoMapper;
using MongoDB.Driver;
using Neighborly.Jobs.ServiceProvider.Interface;
using Neighborly.Jobs.ServiceProvider;

namespace Neighborly.Jobs.ServiceProvider
{
    

    public class JobsServiceProvider : IJobsServiceProvider
    {
        private readonly IMongoCollection<JobCategory> _jobCategory;
        private readonly IMongoCollection<Job> _job;
        private readonly IMapper _mapper;

        public JobsServiceProvider(DbServiceProvider context, IMapper mapper)
        {
            _jobCategory = context.JobCategory;
            _job = context.Jobs;
            _mapper = mapper;
        }

        public async Task<IEnumerable<JobCategoryDto>> GetJobsAsync()
        {
            var jobs = await _jobCategory.Find(job => true).ToListAsync();
            return _mapper.Map<IEnumerable<JobCategoryDto>>(jobs);
        }

        public async Task AddJobCategoryAsync(JobCategoryDto jobDto)
        {
            var job = _mapper.Map<JobCategory>(jobDto);
            await _jobCategory.InsertOneAsync(job);
            
        }


        public async Task AddJobAsync(JobDto jobDto)
        {
            var job = _mapper.Map<Job>(jobDto);
            await _job.InsertOneAsync(job);
        }

        public async Task AddTaskAsync(TaskDto taskDto)
         {
        Console.WriteLine("Received TaskDto in Service Layer:");
        Console.WriteLine($"Title: {taskDto.Title}, Description: {taskDto.Description}, Zipcode: {taskDto.Zipcode}");

        var task = _mapper.Map<Job>(taskDto);

        Console.WriteLine("Mapped Job Object:");
        Console.WriteLine($"Title: {task.Title}, Description: {task.Description}, Zipcode: {task.Zipcode}");

        await _job.InsertOneAsync(task);

        Console.WriteLine("✅ Task Inserted Successfully!");
        }
    }
}
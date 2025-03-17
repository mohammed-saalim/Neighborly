using Neighborly.Jobs.ServiceProvider.Interface;
using Neighborly.Jobs.DTOs;
using Neighborly.Jobs.Models;
using AutoMapper;

namespace Neighborly.Jobs.RequestHandler
{
    public class JobRequestHandler
    {
        private readonly IJobsServiceProvider _jobService;
         private readonly IMapper _mapper;

        public JobRequestHandler(IJobsServiceProvider jobService, IMapper mapper)
        {
            _jobService = jobService;
            _mapper = mapper;
        }

        public async Task<IResult> GetJobsAsync()
        {
            var jobs = await _jobService.GetJobsAsync();
            return Results.Ok(jobs);
        }


        public async Task<IResult> AddJobCategoryAsync(JobCategoryDto jobDto)
        {
            await _jobService.AddJobCategoryAsync(jobDto);
            return Results.Created($"/jobs/{jobDto.Name}", jobDto);
        }

        public async Task<IResult> AddJobAsync(JobDto jobDto)
        {
            await _jobService.AddJobAsync(jobDto);
             var job = _mapper.Map<JobDto, Job>(jobDto); 
            return Results.Created($"/jobs/{jobDto.Title}", jobDto);
        }

        public async Task<IResult> AddTaskAsync(TaskDto taskDto)
{
    Console.WriteLine("🔍 Received TaskDto in JobRequestHandler:");
    Console.WriteLine($"Title: {taskDto.Title}");
    Console.WriteLine($"Description: {taskDto.Description}");
    Console.WriteLine($"Zipcode: {taskDto.Zipcode}");

    try
    {
        await _jobService.AddTaskAsync(taskDto);
        Console.WriteLine("✅ Task Successfully Passed to Service Layer!");
        return Results.Created($"/tasks/{taskDto.Title}", taskDto);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Error in AddTaskAsync: {ex.Message}");
        return Results.Problem($"Server Error: {ex.Message}");
    }
}

    }
}
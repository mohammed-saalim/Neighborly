using Neighborly.Jobs.DTOs;


namespace Neighborly.Jobs.ServiceProvider.Interface{


    public interface IJobsServiceProvider
    {
        Task<IEnumerable<JobCategoryDto>> GetJobsAsync();
        Task AddJobAsync(JobDto jobDto);
        Task AddJobCategoryAsync(JobCategoryDto jobDto);
        Task AddTaskAsync(TaskDto taskDto);
    }


}    
using Xunit;
using AutoMapper;
using Neighborly.Jobs.Mappers;
using Neighborly.Jobs.Models;
using Neighborly.Jobs.DTOs;

public class JobProfileTests
{
    private readonly IMapper _mapper;

    public JobProfileTests()
    {
        var mappingConfig = new MapperConfiguration(mc =>
        {
            mc.AddProfile(new JobProfile());
        });
        _mapper = mappingConfig.CreateMapper();
    }

    [Fact]
    public void Job_To_JobDto_Mapping_IsValid()
    {
        // Arrange
        var job = new Job
        {
            Title = "Software Engineer",
            Description = "Develops software applications",
            Zipcode = "12345" 
        };

        // Act
        var jobDto = _mapper.Map<JobDto>(job);

        // Assert
        Assert.NotNull(jobDto);
        Assert.Equal(job.Id, jobDto.Id);
        Assert.Equal(job.Title, jobDto.Title);
        Assert.Equal(job.Description, jobDto.Description);
        Assert.Equal(job.Zipcode, jobDto.Zipcode);
    }

    [Fact]
    public void JobDto_To_Job_Mapping_IsValid()
    {
        // Arrange
        var jobDto = new JobDto
        {
            Title = "Data Scientist",
            Description = "Works with data analysis",
            Zipcode = "67890" 
        };

        // Act
        var job = _mapper.Map<Job>(jobDto);

        // Assert
        Assert.NotNull(job);
        Assert.Equal(jobDto.Id, job.Id);
        Assert.Equal(jobDto.Title, job.Title);
        Assert.Equal(jobDto.Description, job.Description);
        Assert.Equal(jobDto.Zipcode, job.Zipcode);
    }
}

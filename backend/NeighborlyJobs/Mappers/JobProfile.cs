using AutoMapper;
using Neighborly.Jobs.Models;

namespace Neighborly.Jobs.Mappers
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            // CreateMap<JobCategory, JobCategory>()
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));

            CreateMap<Job, Job>()
                .ForMember(dest => dest.JobCategory, opt => opt.MapFrom(src => src.JobCategory))
                .ForMember(dest => dest.JobDescription, opt => opt.MapFrom(src => src.JobDescription))
                .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
                .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.Phone))
                .ForMember(dest => dest.PostedAt, opt => opt.MapFrom(src => src.PostedAt));
        }
    }
}

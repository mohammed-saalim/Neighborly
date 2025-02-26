using AutoMapper;
using Neighborly.Jobs.Models;
using Neighborly.Jobs.DTOs;

namespace Neighborly.Jobs.Mappers
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<JobCategoryDto, JobCategory>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
            CreateMap<JobCategory, JobCategoryDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));

                CreateMap<JobDto, Job>()
                    .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                    // .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                    .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                    .ForMember(dest => dest.DatePosted, opt => opt.MapFrom(src => src.DatePosted))
                    .ForMember(dest => dest.Zipcode, opt => opt.MapFrom(src => src.Zipcode));
                CreateMap<Job, JobDto>()
                    .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                    .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                    .ForMember(dest => dest.Zipcode, opt => opt.MapFrom(src => src.Zipcode))
                    .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price));
                    // .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category));
        }
    }
}
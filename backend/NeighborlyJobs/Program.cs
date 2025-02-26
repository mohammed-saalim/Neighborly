using Neighborly.Jobs.ServiceProvider;
using Neighborly.Jobs.ServiceProvider.Interface;
using Neighborly.Jobs.RequestHandler;
using Neighborly.Jobs.Endpoints;
using Neighborly.Jobs.Mappers;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<DbServiceProvider>();
builder.Services.AddScoped<IJobsServiceProvider, JobsServiceProvider>();
builder.Services.AddScoped<JobRequestHandler>();

// AutoMapper Configuration
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); //Lajja

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// app.MapGet("/", () =>
// {
//     return "Jurgen Klopp - From Doubters to Believers!";
// });

app.MapJobEndpoints();

app.Run();
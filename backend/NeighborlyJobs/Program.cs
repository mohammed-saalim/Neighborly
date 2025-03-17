using Neighborly.Jobs.ServiceProvider;
using Neighborly.Jobs.ServiceProvider.Interface;
using Neighborly.Jobs.RequestHandler;
using Neighborly.Jobs.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allow frontend URL
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials(); // Required for SignalR
    });
});

builder.Services.AddSignalR();

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

app.UseCors("CorsPolicy"); // Apply the CORS policy
app.UseRouting();


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

app.MapControllers();

app.MapJobEndpoints();

app.Run();
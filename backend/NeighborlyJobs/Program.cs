using Neighborly.Jobs.ServiceProvider;
using Neighborly.Jobs.ServiceProvider.Interface;
using Neighborly.Jobs.RequestHandler;
using Neighborly.Auth.RequestHandler;
using Neighborly.Jobs.Endpoints;
using Neighborly.Auth.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Neighborly.Auth.Middleware; // ✅ Add this line


var builder = WebApplication.CreateBuilder(args);

// 🔹 Load JWT Configuration
var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? "DEFAULT_SECRET_KEY");

// 🔹 Configure JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        ClockSkew = TimeSpan.Zero
    };
});

// 🔹 Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<DbServiceProvider>();
builder.Services.AddSingleton<UserServiceProvider>();
builder.Services.AddScoped<AuthRequestHandler>();
builder.Services.AddScoped<JobRequestHandler>();
builder.Services.AddSingleton<JwtService>(); // 🔹 Add this line
builder.Services.AddScoped<IJobsServiceProvider, JobsServiceProvider>();
builder.Services.AddSingleton<WorkerServiceProvider>();
builder.Services.AddScoped<WorkerAuthRequestHandler>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); 

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 🔹 Configure Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

// 🔹 Enable Authentication & Authorization Middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapJobEndpoints();
app.MapAuthEndpoints(); // ✅ Register Authentication Routes
app.MapWorkerAuthEndpoints();

app.Run();

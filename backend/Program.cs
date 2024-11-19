var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:5173")   
           .AllowAnyHeader()
           .AllowAnyMethod();
    builder.WithOrigins("http://127.0.0.1:5173")   
           .AllowAnyHeader()
           .AllowAnyMethod();
    builder.WithOrigins("https://clipr.vercel.app")    // for deployed site
           .AllowAnyHeader()
           .AllowAnyMethod();
    builder.WithOrigins("https://clipr-danielpasions-projects.vercel.app")    // for deployed site
           .AllowAnyHeader()
           .AllowAnyMethod();
    builder.WithOrigins("https://clipr-git-main-danielpasions-projects.vercel.app")    // for deployed site
           .AllowAnyHeader()
           .AllowAnyMethod();
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

using backend.Models;
using Microsoft.AspNetCore.Mvc;
// using NRedisStack;
// using NRedisStack.RedisStackCommands;
using StackExchange.Redis;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TestDataController : ControllerBase
{
    [HttpGet("user")]
    public IActionResult getTestData()
    {
        ConnectionMultiplexer redis = ConnectionMultiplexer.Connect("nameless.redis.cache.windows.net:6380,password=h50mXz9PcVwe13Du14MlZZ1YfB0ROI9FUAzCaKBXt84=,ssl=True,abortConnect=False");
        IDatabase db = redis.GetDatabase();

        return Ok(new TestData
        {
            FirstName = db.StringGet("ourmessage")
        });
    }
}

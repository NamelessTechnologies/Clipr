using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TestDataController : ControllerBase
{
    [HttpGet("user")]
    public IActionResult getTestData() {
        return Ok(new TestData
        {
            FirstName = "Dan",
            LastName = "Heng",
            Faction = "Trailblaze"
        });
    }
}

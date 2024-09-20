using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class TestDataController : ControllerBase
{
    private NpgsqlConnection conn;

    public TestDataController() {
        conn = DBConn.Instance().getConn();
    }


    [HttpGet("user")]
    public IActionResult getTestData()
    {
        // Define your SQL query (e.g., retrieving a single value from a specific column)
        var sql = "SELECT email FROM users WHERE user_id = 1 LIMIT 1";

        // Open connection object
        conn.Open();

        // Create a command object
        using var cmd = new NpgsqlCommand(sql, conn);

        // Execute the command and retrieve the value
        var result = cmd.ExecuteScalar();

        // Check if the result is not null and display it
        if (result != null)
        {
            Console.WriteLine($"The value is: {result}");
        }
        else
        {
            Console.WriteLine("No value returned.");
        }

        return Ok(new TestData
        {
            FirstName = result.ToString()
        });
    }
}

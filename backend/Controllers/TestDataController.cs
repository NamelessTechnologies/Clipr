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
        // Define your connection string (replace with your actual values)
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=test";

        // // Define your SQL query (e.g., retrieving a single value from a specific column)
        // var sql = "SELECT firstname FROM users LIMIT 1";

        // Define your SQL query (e.g., retrieving a single value from a specific column)
        var sql = "SELECT * FROM users";

        // Create a connection object
        using var conn = new NpgsqlConnection(connString);
        // if (conn.State != System.Data.ConnectionState.Open) {
        //     conn.Open();
        // }

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
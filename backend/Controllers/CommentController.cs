using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class CommentController : ControllerBase {
    private NpgsqlConnection conn;

    public CommentController() {
        conn = DBConn.Instance().getConn();
    }

    [HttpGet("{id}")]
    public IActionResult getComment(int id) {
        //
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

        // Define your SQL query (e.g., retrieving a single value from a specific column)
        var sql = "SELECT * FROM comment WHERE id = " + id;

        // Open a connection object
        using var conn = new NpgsqlConnection(connString);
        // if (conn.State != System.Data.ConnectionState.Open){
        //     conn.Open();
        // }

        // Create a command object
        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();

        // THIS DONT WORK YET
        if (reader.Read()) {
            return Ok(new Comment {
                // ID = reader.GetInt32(0),
                // UserID = reader.GetInt32(1),
                
            });
        }  else {
            return BadRequest("no data");
        }

    }
}
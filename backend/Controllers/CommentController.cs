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

    private NpgsqlConnection conn;

    public CommentController(){
        conn = DBConn.Instance().getConn();
    }

    [HttpGet("{id}")]
    public IActionResult getComment(int id) {
        // Define your SQL query (e.g., retrieving a single value from a specific column)
        var sql = "SELECT * FROM comment WHERE id = " + id;

        // Open a connection object
        if (conn.State != System.Data.ConnectionState.Open){
            conn.Open();
        }

        // Create a command object
        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();

        // THIS DONT WORK YET
        if (reader.Read()) {
            return Ok(new Comment {
                ID = reader.GetInt32(0),
                ParentID = reader.GetInt32(1),
                PostID = reader.GetInt32(2),
                UserID = reader.GetInt32(3),
                Message = reader.GetString(4)
            });
        }  else {
            return BadRequest("no data");
        }

    }

    [HttpGet]
    public IActionResult getAllComments() {
        var sql = "SELECT * FROM comment";

        if (conn.State != System.Data.ConnectionState.Open) {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var comments = new List<Comment>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Comment newComment = new Comment {
                ID = reader.GetInt32(0),
                ParentID = reader.GetInt32(1),
                PostID = reader.GetInt32(2),
                UserID = reader.GetInt32(3),
                Message = reader.GetString(4)
            };
            comments.Add(newComment);
        }
        return Ok(comments);

    }
}
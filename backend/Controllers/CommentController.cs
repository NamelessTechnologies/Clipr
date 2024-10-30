using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class CommentController : ControllerBase {

    [HttpGet("{id}")]
    public IActionResult getComment(int id) {

        // Define your SQL query (e.g., retrieving a single value from a specific column)
        var sql = "SELECT * FROM comment WHERE id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();
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
                Content = reader.GetString(4)
            });
        }  else {
            return BadRequest("no data");
        }

    }
    [HttpGet]
    public IActionResult getAllComments() {
        var sql = "SELECT * FROM comment";

        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var comments = new List<Comment>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Comment newComment = new Comment {
                ID = reader.GetInt32(0),
                ParentID = reader.IsDBNull(1) ? null : reader.GetInt32(1),
                PostID = reader.GetInt32(2),
                UserID = reader.GetInt32(3),
                Content = reader.GetString(4)
            };
            comments.Add(newComment);
        }
        return Ok(comments);
    }

        // TEMPORARY
    [HttpGet("/comment_like/temp")]
    public IActionResult getCommentLikeDataTEMP() {
        var sql = "SELECT * FROM comment_like";

        using var conn = DBConn.GetConn();
        conn.Open();
        
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var commentLikes = new List<Comment_Like_Temp>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Comment_Like_Temp newComment = new Comment_Like_Temp {
                CommentID = reader.GetInt32(0),
                UserID = reader.GetInt32(1)
            };
            commentLikes.Add(newComment);
        }
        return Ok(commentLikes);
    }
}
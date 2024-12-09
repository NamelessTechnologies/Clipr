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
        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();

        // THIS DONT WORK YET
        if (reader.Read()) {
            return Ok(new Comment {
                ID = reader.GetInt32(0),
                ParentID = reader.IsDBNull(reader.GetOrdinal("parent_id")) ? (int?)null : reader.GetInt32(reader.GetOrdinal("parent_id")),
                PostID = reader.GetInt32(2),
                UserID = reader.GetInt32(3),
                Content = reader.GetString(4)
            });
        }  else {
            return NotFound("User not found.");
        }

    }

    [HttpGet("post/{id}")]
    public IActionResult getPostcomments(int id) {
        var sql = "SELECT Comment.*, Users.username, Users.pfp, (SELECT COUNT(*) AS like_count FROM comment_like WHERE comment_like.comment_id = Comment.id) FROM Comment INNER JOIN Users on Comment.user_id = Users.user_id WHERE post_id = " + id;
        
        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        if (!reader.HasRows) {
            return BadRequest("No Comments");
        }

        var comments = new List<FINAL_Comment>();
        while (reader.Read()) {
            FINAL_Comment comment = new FINAL_Comment {
                CommentID = reader.GetInt32(0),
                ParentID = reader.IsDBNull(1) ? null : reader.GetInt32(1),
                PostID = reader.GetInt32(2),
                UserID = reader.GetInt32(3),
                Content = reader.GetString(4),
                Username = reader.GetString(5),
                PFP = reader.GetString(6),
                LikeCount = reader.GetInt32(7)
            };
            comments.Add(comment);
        }
        return Ok(comments);
    }

    [HttpPost]
    public async Task<IActionResult> postComment([FromForm] int post_id, [FromForm] int user_id, [FromForm] string content) {
        try {
            var sql = "INSERT INTO Comment(post_id, user_id, content) VALUES(@post_id, @user_id, @content) RETURNING id";

            using var conn = DBConn.GetConn();
            conn.Open();

            await using (var cmd = new NpgsqlCommand(sql, conn)) {
                cmd.Parameters.AddWithValue("post_id", post_id);
                cmd.Parameters.AddWithValue("user_id", user_id);
                cmd.Parameters.AddWithValue("content", content);

                var insertedId = (int) await cmd.ExecuteScalarAsync();
                return Ok(new {comment_id = insertedId});        
            }
        } catch (Exception e) {
            return (OkObjectResult)StatusCode(500, new { error = e.Message });
        }
    }

    [HttpGet]
    public IActionResult getAllComments() {
        var sql = "SELECT * FROM comment";

        using var conn = DBConn.GetConn();
        using var cmd = new NpgsqlCommand(sql, conn);
        conn.Open();
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
        using var cmd = new NpgsqlCommand(sql, conn);
        conn.Open();
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
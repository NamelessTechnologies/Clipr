using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class PostController : ControllerBase {

    private NpgsqlConnection conn;

    public PostController(){
        conn = DBConn.Instance().getConn();
    }

    [HttpGet("{id}")]
    public IActionResult getPost(int id) {

        // DatabaseConnection con1 = new DatabaseConnection();
        string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

        var sql = "SELECT * FROM post WHERE post_id = " + id;

        using var conn = new NpgsqlConnection(connString);
        // if (conn.State != System.Data.ConnectionState.Open) {
        //     conn.Open();
        // }
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();
        if (reader.Read()) {
            return Ok(new Post {
                PostID = reader.GetInt32(0),
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Description = reader.GetString(3),
                DatePosted = reader.GetDateTime(4),
                MediaType = reader.GetString(5)
            });
        } else {
            return BadRequest("no data");
        }
    }

    [HttpGet]
    public IActionResult getAllPosts() {

        // DatabaseConnection con1 = new DatabaseConnection();
        string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM post";

        using var conn = new NpgsqlConnection(connString);
        // if (conn.State != System.Data.ConnectionState.Open) {
        //     conn.Open();
        // }
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var posts = new List<Post>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Post newPost = new Post {
                PostID = reader.GetInt32(0),
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Description = reader.GetString(3),
                DatePosted = reader.GetDateTime(4),
                MediaType = reader.GetString(5)  
            };
            posts.Add(newPost);
        }
        return Ok(posts);
    }
}
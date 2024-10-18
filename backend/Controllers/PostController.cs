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
        conn = DBConn.GetConn();
    }

    [HttpGet("{id}")]
    public IActionResult getPost(int id) {
        var sql = "SELECT * FROM post WHERE post_id = " + id;

        // execute command
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
        var sql = "SELECT * FROM post";

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


    [HttpPost]
    public async void postTEMPTextPost([FromBody] TEMP_Post post) {

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "INSERT INTO TEMP_post (user_id, title, content, datePosted) VALUES(@user_id, @title, @content, @datePosted);";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open) {
            conn.Open();
        }

        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("user_id", post.UserID);
            cmd.Parameters.AddWithValue("title", post.Title);
            cmd.Parameters.AddWithValue("content", post.Content);
            cmd.Parameters.AddWithValue("datePosted", DateTime.Now);

            await cmd.ExecuteNonQueryAsync();
        }
    }

    [HttpGet("/TEMP_post/{id}")]
    public IActionResult getTEMPTextPost(int id) {
        var connString1 = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

        var sql = "SELECT * FROM temp_post WHERE temp_post_id = " + id;

        using var conn = new NpgsqlConnection(connString1);
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();
        if (reader.Read()) {
            return Ok(new TEMP_Post {
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Content = reader.GetString(3)
            });
        } else {
            return BadRequest("no data");
        }
    }

    [HttpGet("/TEMP_post/")]
    public IActionResult getAllTEMP_Posts() {

        // DatabaseConnection con1 = new DatabaseConnection();
        // string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM TEMP_Post";

        using var conn = new NpgsqlConnection(connString);
        // if (conn.State != System.Data.ConnectionState.Open) {
        //     conn.Open();
        // }
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var posts = new List<TEMP_Post>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            TEMP_Post newPost = new TEMP_Post {
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Content = reader.GetString(3), 
            };
            posts.Add(newPost);
        }
        return Ok(posts);
    }


    // TEMPORARY
    [HttpGet("/tag/temp")]
    public IActionResult getTagDataTEMP() {
        var sql = "SELECT * FROM tag";

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var tags = new List<Tag_Temp>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Tag_Temp newPost = new Tag_Temp {
                ID = reader.GetInt32(0),
                Name = reader.GetString(1)
            };
            tags.Add(newPost);
        }
        return Ok(tags);
    }

    // TEMPORARY
    [HttpGet("/likes/temp")]
    public IActionResult getLikeDataTEMP() {
        var sql = "SELECT * FROM likes";

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var likes = new List<Like_Temp>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Like_Temp newPost = new Like_Temp {
                PostID = reader.GetInt32(0),
                UserID = reader.GetInt32(1)
            };
            likes.Add(newPost);
        }
        return Ok(likes);
    }

    // TEMPORARY
    [HttpGet("/post_tag/temp")]
    public IActionResult getPostTagsTEMP() {
        var sql = "SELECT * FROM post_tag";

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var postTags = new List<Post_Tag_Temp>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Post_Tag_Temp newPost = new Post_Tag_Temp {
                PostID = reader.GetInt32(0),
                TagID = reader.GetInt32(1)
            };
            postTags.Add(newPost);
        }
        return Ok(postTags);
    }

    // TEMPORARY
    [HttpGet("/media")]
    public IActionResult getMedia() {
        var sql = "SELECT * FROM media";

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var medias = new List<Media>();

        if (!reader.HasRows) {
            return BadRequest("no data");
        }

        while (reader.Read()) {
            Media newMedia = new Media {
                MediaID = reader.GetInt32(0),
                PostID = reader.GetInt32(1),
                Url = reader.GetString(2)
            };
            medias.Add(newMedia);
        }
        return Ok(medias);
    }
}
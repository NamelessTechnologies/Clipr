using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class PostController : ControllerBase {

    [HttpPost("likeComment")]
    public async Task<IActionResult> likeComment([FromForm] int user_id, [FromForm] int comment_id) {
        var sql = "INSERT INTO comment_like (user_id, comment_id) VALUES(@user_id, @comment_id);";
        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(sql, conn)) {
                cmd.Parameters.AddWithValue("user_id", user_id);
                cmd.Parameters.AddWithValue("comment_id", comment_id);

                await cmd.ExecuteNonQueryAsync();
            }

            return Ok(new { success = "Comment liked successfully"});
        }
        catch (Exception ex) {
            return StatusCode(500, new {error = ex.Message});
        }
    }

    [HttpDelete("unlikeComment")]
    public async Task<IActionResult> unlikeComment([FromForm] int user_id, [FromForm] int comment_id) {
        var sql = "DELETE FROM comment_like WHERE user_id = @user_id AND comment_id = @comment_id";

        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("user_id", user_id);
            cmd.Parameters.AddWithValue("comment_id", comment_id);
            var result = await cmd.ExecuteNonQueryAsync();
            if (result == 0)
            {
                return NotFound("ERROR: user id " + user_id + " is not liking comment id " +  comment_id);
            }

            return NoContent();
        } catch (Exception ex) {
            Console.Write(ex);
            return StatusCode(500, "Error making request to unlike comment");
        }
    }

    [HttpPost("likePost")]
    public async Task<IActionResult> likePost([FromForm] int user_id, [FromForm] int post_id) {
        var sql = "INSERT INTO likes (user_id, post_id) VALUES(@user_id, @post_id);";
        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(sql, conn)) {
                cmd.Parameters.AddWithValue("user_id", user_id);
                cmd.Parameters.AddWithValue("post_id", post_id);

                await cmd.ExecuteNonQueryAsync();
            }

            return Ok(new { success = "Post liked successfully"});
        }
        catch (Exception ex) {
            return StatusCode(500, new {error = ex.Message});
        }
    }

    [HttpDelete("unlikePost")]
    public async Task<IActionResult> unlikePost([FromForm] int user_id, [FromForm] int post_id) {
        var sql = "DELETE FROM likes WHERE user_id = @user_id AND post_id = @post_id";

        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("user_id", user_id);
            cmd.Parameters.AddWithValue("post_id", post_id);
            var result = await cmd.ExecuteNonQueryAsync();
            if (result == 0)
            {
                return NotFound("ERROR: user id " + user_id + " is not liking post id " +  post_id);
            }

            return NoContent();
        } catch (Exception ex) {
            Console.Write(ex);
            return StatusCode(500, "Error making request to unlike post");
        }
    }

    [HttpPost("savePost")]
    public async Task<IActionResult> savePost([FromForm] int user_id, [FromForm] int post_id) {
        var sql = "INSERT INTO save (user_id, post_id) VALUES(@user_id, @post_id);";
        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            await using (var cmd = new NpgsqlCommand(sql, conn)) {
                cmd.Parameters.AddWithValue("user_id", user_id);
                cmd.Parameters.AddWithValue("post_id", post_id);

                await cmd.ExecuteNonQueryAsync();
            }

            return Ok(new { success = "Post saved successfully"});
        }
        catch (Exception ex) {
            return StatusCode(500, new {error = ex.Message});
        }
    }

    [HttpDelete("unsavePost")]
    public async Task<IActionResult> unsavePost([FromForm] int user_id, [FromForm] int post_id) {
        var sql = "DELETE FROM save WHERE user_id = @user_id AND post_id = @post_id";

        try {
            using var conn = DBConn.GetConn();
            await conn.OpenAsync();

            using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("user_id", user_id);
            cmd.Parameters.AddWithValue("post_id", post_id);
            var result = await cmd.ExecuteNonQueryAsync();
            if (result == 0)
            {
                return NotFound("ERROR: user id " + user_id + " is not saving post id " +  post_id);
            }

            return NoContent();
        } catch (Exception ex) {
            Console.Write(ex);
            return StatusCode(500, "Error making request to save post");
        }
    }

    [HttpGet("didUserLike")]
    public IActionResult checkUserLike([FromForm] int post_id, [FromForm] int user_id) {
        var sql = "SELECT * FROM likes WHERE user_id = @user_id AND post_id = @post_id";

        using var conn = DBConn.GetConn();
        conn.Open();
        
        // execute command
        using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("user_id", user_id);
        cmd.Parameters.AddWithValue("post_id", post_id);
        var reader = cmd.ExecuteReader();
        
        if(reader.HasRows) {
            reader.Read();
            return Ok(new {message = true});
        }
        else {
            return Ok(new {message = false});
        }
    }

    [HttpGet("real/getPostInfo/{post_id}/{user_id}")]
    public IActionResult getRealPostInfo(int post_id, int user_id) {
        var sql = "SELECT (SELECT COUNT(user_id) as like_count FROM likes WHERE post_id = " + post_id + "), (SELECT COUNT(user_id) AS save_count FROM save WHERE post_id = " + post_id + "), (SELECT url AS media_link FROM media WHERE post_id = " + post_id + "), post.*, users.username, users.pfp, (SELECT COUNT(post_id) as postLiked FROM likes WHERE user_id = " + user_id + " AND post_id = " + post_id + "), (SELECT COUNT(post_id) as saveLiked FROM save WHERE user_id = " + user_id + " AND post_id = " + post_id + ") FROM post INNER JOIN users ON post.user_id = users.user_id WHERE post_id =  " + post_id;

        using var conn = DBConn.GetConn();
        conn.Open();
        
        // execute command
        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();
        if (reader.Read()) {
            return Ok(new AllPostInfo {
                Like_Count = reader.GetInt32(0),
                Save_Count = reader.GetInt32(1),
                Media_Link = reader.GetString(2),
                Post_Id = reader.GetInt32(3),
                User_Id = reader.GetInt32(4),
                Title = reader.GetString(5),
                Description = reader.GetString(6),
                DatePosted = reader.GetDateTime(7),
                Media_Type = reader.GetString(8),
                Username = reader.GetString(9),
                Pfp = reader.GetString(10),
                Liked = reader.GetInt32(11),
                Saved = reader.GetInt32(12)
            });
        } else {
            return NotFound("User not found/No posts.");
        }
    }


    [HttpGet("real/getPostArray")]
    public IActionResult getRealPostInfo() {
        var sql = "SELECT post_id FROM POST ORDER BY POST_ID DESC";

        using var conn = DBConn.GetConn();
        conn.Open();
        
        // execute command
        using var cmd = new NpgsqlCommand(sql, conn);

        var reader = cmd.ExecuteReader();
        var postArray = new List<int>();
        while (reader.Read()) {
            postArray.Add(reader.GetInt32(0));
        }
        return Ok(new {postArray});
    }

    [HttpGet("profile/{id}")]
    public IActionResult getProfilePosts(int id) {
        var sql = "SELECT Post.post_id, Post.media_type, Media.url FROM Post INNER JOIN Media ON Post.post_id = Media.post_id WHERE user_id = " + id + " ORDER BY Post.post_id DESC;";
        
        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        if (!reader.HasRows) {
            return BadRequest("No Comments");
        }

        var profilePosts = new List<ProfilePost>();
        while (reader.Read()) {
            ProfilePost comment = new ProfilePost {
                Post_Id = reader.GetInt32(0),
                Media_Type = reader.GetString(1),
                Media_Link = reader.GetString(2)
            };
            profilePosts.Add(comment);
        }
        return Ok(profilePosts);
    }

    [HttpGet("bookmark/{id}")]
    public IActionResult getBookmaredPosts(int id) {
        var sql = "SELECT Post.post_id, Post.media_type, (SELECT Media.url FROM Media WHERE Media.post_id = Post.post_id) FROM Post INNER JOIN Save ON Save.post_id = Post.post_id WHERE Save.user_id = " + id;
        
        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        if (!reader.HasRows) {
            return BadRequest("No Comments");
        }

        var profilePosts = new List<ProfilePost>();
        while (reader.Read()) {
            ProfilePost comment = new ProfilePost {
                Post_Id = reader.GetInt32(0),
                Media_Type = reader.GetString(1),
                Media_Link = reader.GetString(2)
            };
            profilePosts.Add(comment);
        }
        return Ok(profilePosts);
    }

    [HttpGet("{id}")]
    public IActionResult getPost(int id) {
        var sql = "SELECT * FROM post WHERE post_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();
        
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
            return NotFound("User not found/No posts.");
        }
    }

    [HttpGet]
    public IActionResult getAllPosts() {
        var sql = "SELECT * FROM post";

        using var conn = DBConn.GetConn();
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


    [HttpPost]
    public async void postTEMPTextPost([FromForm] TEMP_Post post) {

        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "INSERT INTO TEMP_post (user_id, title, content, datePosted) VALUES(@user_id, @title, @content, @datePosted);";

        using var conn = DBConn.GetConn();
        conn.Open();

        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("user_id", post.UserID);
            cmd.Parameters.AddWithValue("title", post.Title);
            cmd.Parameters.AddWithValue("content", post.Content);
            cmd.Parameters.AddWithValue("datePosted", DateTime.Now);

            await cmd.ExecuteNonQueryAsync();
        }
    }

    [HttpPost("realpost")]
    public async Task<IActionResult> postRealPost([FromForm] int user_id, [FromForm] string title, [FromForm] string description, [FromForm] string media_type) {
        try {
        var sql = "INSERT INTO post (user_id, title, description, datePosted, media_type) VALUES(@user_id, @title, @description, @datePosted, @media_type) RETURNING post_id;";

        using var conn = DBConn.GetConn();
        conn.Open();

        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("user_id", user_id);
            cmd.Parameters.AddWithValue("title", title);
            cmd.Parameters.AddWithValue("description", description);
            cmd.Parameters.AddWithValue("datePosted", DateTime.Now);
            cmd.Parameters.AddWithValue("media_type", media_type);

            var insertedId = (int) await cmd.ExecuteScalarAsync();
            return Ok(new {post_id = insertedId});        }
        } catch (Exception e) {
            return (OkObjectResult)StatusCode(500, new { error = e.Message });
        }
    }

    [HttpGet("/TEMP_post/{id}")]
    public IActionResult getTEMPTextPost(int id) {

        var sql = "SELECT * FROM temp_post WHERE temp_post_id = " + id;

        using var conn = DBConn.GetConn();
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
            return NotFound("TempPost not found.");
        }
    }

    [HttpGet("/TEMP_post/")]
    public IActionResult getAllTEMP_Posts() {

        var sql = "SELECT * FROM TEMP_Post";

        using var conn = DBConn.GetConn();
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



// --------------------------------------- TEMP PHOTO STUFF ------------------------------------------//
    [HttpPost("skibidi")]
    public async void CreatePostWithImage([FromForm] int userId, [FromForm] string title, [FromForm] string content, [FromForm] IFormFile file)
    {
        if (file == null)
        {
            Console.Write("image post file to be uploaded was null");
        }

        try
        {
            byte[] imageBytes;
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                imageBytes = memoryStream.ToArray();
            }

            using (var conn = DBConn.GetConn()) 
            {
                await conn.OpenAsync();

                var sql = "INSERT INTO temp_photo_post (user_id, title, content, datePosted, photo_data) VALUES (@userId, @title, @content, @datePosted, @photoData);"; 

                using (var cmd = new NpgsqlCommand(sql, conn))
                {
                    cmd.Parameters.AddWithValue("userId", userId);
                    cmd.Parameters.AddWithValue("title", title);
                    cmd.Parameters.AddWithValue("content", content);
                    cmd.Parameters.AddWithValue("datePosted", DateTime.Now); 
                    cmd.Parameters.AddWithValue("photoData", imageBytes);

                    await cmd.ExecuteScalarAsync();
                }
            }
        }
        catch (Exception ex)
        {
            Console.Write("error uploading temp photo");
            Console.Write(ex);
        }
    }

    [HttpGet("skibidi/all")]
    public IActionResult GetAllTEMP_PhotoPosts()
    {
        // fetches poster's username and pfp url along with all of post's info
        var sql = "SELECT a.*, b.username, b.pfp FROM temp_photo_post a INNER JOIN users b on a.user_id = b.user_id;";

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var photoPosts = new List<TEMP_Photo_Post>();

        if (!reader.HasRows)
        {
            return BadRequest("no data");
        }

        while (reader.Read())
        {
            TEMP_Photo_Post newPhotoPost = new TEMP_Photo_Post
            {
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Content = reader.GetString(3),
                PhotoData = reader["photo_data"] is DBNull ? null : (byte[])reader["photo_data"], // 4 - date, 5 - photo data
                Username = reader.GetString(6), 
                Pfp_Url = reader.GetString(7)
            };
            photoPosts.Add(newPhotoPost);
        }
        return Ok(photoPosts);
    }


    // TEMPORARY
    [HttpGet("/tag/temp")]
    public IActionResult getTagDataTEMP() {
        var sql = "SELECT * FROM tag";

        using var conn = DBConn.GetConn();
        conn.Open();

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

        using var conn = DBConn.GetConn();
        conn.Open();

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

        using var conn = DBConn.GetConn();
        conn.Open();

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

        using var conn = DBConn.GetConn();
        conn.Open();

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

    [HttpGet("/TEMP_post/user_id/{id}")]
    public IActionResult getPostByUserId(int id) {
        var sql = "SELECT * FROM temp_post WHERE user_id = " + id;
        Console.WriteLine(sql);

       using var conn = DBConn.GetConn();
       conn.Open();
       
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var posts = new List<TEMP_Post>();

        if (!reader.HasRows) {
            return NotFound("No posts found.");
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
}
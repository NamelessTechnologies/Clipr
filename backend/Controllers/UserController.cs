using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;
using System.Threading.Tasks.Dataflow;
using System.Data.SqlClient;
using Azure.Core.Serialization;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    // private NpgsqlConnection conn;

    // public UserController() {
    //     conn = DBConn.Instance().getConn();
    // }

    private String connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database;Pooling=true;MinPoolSize=0;MaxPoolSize=20;";


    [HttpGet("{id}")]
    public IActionResult getOneUser(int id)
    {
        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users WHERE user_id = " + id;
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        using (var rdr = cmd.ExecuteReader())
        {
            if (rdr.Read())
            {
                var user_id = rdr.GetInt32(0);
                var username = rdr.GetString(1);
                var email = rdr.GetString(2);
                var password = rdr.GetString(3);
                var biography = rdr.GetString(4);
                var nickname = rdr.GetString(5);
                var pfp = rdr.GetString(6);

                Console.WriteLine(user_id);
                Console.WriteLine(username);
                Console.WriteLine(email);
                Console.WriteLine(password);
                Console.WriteLine(biography);
                Console.WriteLine(nickname);
                Console.WriteLine(pfp);

                return Ok(new User
                {
                    User_id = user_id,
                    Username = username,
                    Email = email,
                    Password = password,
                    Biography = biography,
                    Nickname = nickname,
                    Pfp = pfp,
                });
            }
            else
            {
                return Ok("Error");
            }
        }
    }

    [HttpPost]
    public async void postUser([FromBody] User user)
    {

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "INSERT INTO users(username, email, password, biography, nickname, pfp) VALUES (@username, @email, @password, @biography, @nickname, @pfp)";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        await using (var cmd = new NpgsqlCommand(sql, conn))
        {
            cmd.Parameters.AddWithValue("username", user.Username);
            cmd.Parameters.AddWithValue("email", user.Email);
            cmd.Parameters.AddWithValue("password", user.Password);
            cmd.Parameters.AddWithValue("biography", user.Biography);
            cmd.Parameters.AddWithValue("nickname", user.Nickname);
            cmd.Parameters.AddWithValue("pfp", user.Pfp);

            await cmd.ExecuteNonQueryAsync();
        }
    }


    [HttpGet("all")]
    public IActionResult getAllUsers()
    {
        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);


        var allUsers = new List<User>();

        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }

                User singleUser = new User
                {
                    User_id = rdr.GetInt32(0),
                    Username = rdr.GetString(1),
                    Email = rdr.GetString(2),
                    Password = rdr.GetString(3),
                    Biography = rdr.GetString(4),
                    Nickname = rdr.GetString(5),
                    Pfp = rdr.GetString(6)
                };

                allUsers.Add(singleUser);
            }
            return Ok(allUsers);
        }
    }

    [HttpGet("followers/{id}")]
    public IActionResult GetAllFollowers(int id)
    {
        // --- query list of follower IDs ---
        var follower_query = "SELECT from_id FROM following WHERE to_id = " + id;

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(follower_query, conn);

        List<int> followerIDs = [];
        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }
                followerIDs.Add(rdr.GetInt32(0));
            }
        }

        // --- query each follower's basic info ---
        var followers = new List<Follower>();
        foreach (int follower_id in followerIDs)
        {
            var follower_info_query = "SELECT user_id, username, nickname, pfp FROM users WHERE user_id = " + follower_id;
            using var cmd2 = new NpgsqlCommand(follower_info_query, conn);

            using var rdr = cmd2.ExecuteReader();
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }

                Follower follower = new Follower
                {
                    UserID = rdr.GetInt32(0),
                    Username = rdr.GetString(1),
                    Nickname = rdr.GetString(2),
                    PFP_URL = rdr.GetString(3)
                };

                followers.Add(follower);
            }
        }
        return Ok(followers);
    }

    [HttpGet("following/{id}")]
    public IActionResult GetAllFollowing(int id)
    {
        // --- query list of IDs for following ---
        var follower_query = "SELECT to_id FROM following WHERE from_id = " + id;

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(follower_query, conn);

        List<int> followerIDs = [];
        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }
                followerIDs.Add(rdr.GetInt32(0));
            }
        }

        // --- query each person you're following's basic info ---
        var followers = new List<Follower>();
        foreach (int follower_id in followerIDs)
        {
            var follower_info_query = "SELECT user_id, username, nickname, pfp FROM users WHERE user_id = " + follower_id;
            using var cmd2 = new NpgsqlCommand(follower_info_query, conn);

            using var rdr = cmd2.ExecuteReader();
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }

                Follower follower = new Follower
                {
                    UserID = rdr.GetInt32(0),
                    Username = rdr.GetString(1),
                    Nickname = rdr.GetString(2),
                    PFP_URL = rdr.GetString(3)
                };

                followers.Add(follower);
            }
        }
        return Ok(followers);
    }


    [HttpGet("{id}/saved/")]
    public IActionResult getUserSaves(int id)
    {
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM post JOIN save ON save.post_id = post.post_id JOIN users ON save.user_id = users.user_id WHERE users.user_id = " + id;

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var saves = new List<Post>();

        if (!reader.HasRows)
        {
            return BadRequest("no data");
        }

        while (reader.Read())
        {
            Post newPost = new Post
            {
                PostID = reader.GetInt32(0),
                UserID = reader.GetInt32(1),
                Title = reader.GetString(2),
                Description = reader.GetString(3),
                DatePosted = reader.GetDateTime(4),
                MediaType = reader.GetString(5)
            };
            saves.Add(newPost);
        }
        return Ok(saves);
    }


    // TEMPORARY
    [HttpGet("/saved/temp")]
    public IActionResult getSaveDataTEMP()
    {
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM save";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var saves = new List<Saved_Temp>();

        if (!reader.HasRows)
        {
            return BadRequest("no data");
        }

        while (reader.Read())
        {
            Saved_Temp newPost = new Saved_Temp
            {
                PostID = reader.GetInt32(0),
                UserID = reader.GetInt32(1)
            };
            saves.Add(newPost);
        }
        return Ok(saves);
    }

    [HttpGet("convo/all")]
    public IActionResult getAllConversations()
    {
        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM conversation";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);


        var allConversations = new List<Conversation>();

        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for conversation data.");
                }

                Conversation singleConversation = new Conversation
                {
                    Id = rdr.GetInt32(0),
                    User_id = rdr.GetInt32(1),
                    User_id_2 = rdr.GetInt32(2),
                };

                allConversations.Add(singleConversation);
            }
            return Ok(allConversations);
        }
    }

    [HttpGet("msg/all")]
    public IActionResult getAllMessages()
    {
        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM message";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);


        var allMessages = new List<Message>();

        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for message data.");
                }

                Message singleMessage = new Message
                {
                    Id = rdr.GetInt32(0),
                    Convo_id = rdr.GetInt32(1),
                    Content = rdr.GetString(2),
                    Datesent = rdr.GetDateTime(3),
                    User_id = rdr.GetInt32(4)

                };

                allMessages.Add(singleMessage);
            }
            return Ok(allMessages);
        }
    }

    [HttpGet("/email/{e}")]
    public IActionResult getPassword(string e)
    {
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users WHERE email = '" + e + "'";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        using (var rdr = cmd.ExecuteReader())
        {
            if (rdr.Read())
            {
                var user_id = rdr.GetInt32(0);
                var username = rdr.GetString(1);
                var email = rdr.GetString(2);
                var password = rdr.GetString(3);
                var biography = rdr.GetString(4);
                var nickname = rdr.GetString(5);
                var pfp = rdr.GetString(6);

                Console.WriteLine(user_id);
                Console.WriteLine(username);
                Console.WriteLine(email);
                Console.WriteLine(password);
                Console.WriteLine(biography);
                Console.WriteLine(nickname);
                Console.WriteLine(pfp);

                return Ok(new User
                {
                    User_id = user_id,
                    Username = username,
                    Email = email,
                    Password = password,
                    Biography = biography,
                    Nickname = nickname,
                    Pfp = pfp,
                });
            }
            else
            {
                return Ok("Error");
            }
        }
    }

    [HttpGet("/username/{u}")]
    public IActionResult getUserFromUsername(string u)
    {
        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users WHERE username = '" + u + "'";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        using (var rdr = cmd.ExecuteReader())
        {
            if (rdr.Read())
            {
                var user_id = rdr.GetInt32(0);
                var username = rdr.GetString(1);
                var email = rdr.GetString(2);
                var password = rdr.GetString(3);
                var biography = rdr.GetString(4);
                var nickname = rdr.GetString(5);
                var pfp = rdr.GetString(6);

                Console.WriteLine(user_id);
                Console.WriteLine(username);
                Console.WriteLine(email);
                Console.WriteLine(password);
                Console.WriteLine(biography);
                Console.WriteLine(nickname);
                Console.WriteLine(pfp);

                return Ok(new User
                {
                    User_id = user_id,
                    Username = username,
                    Email = email,
                    Password = password,
                    Biography = biography,
                    Nickname = nickname,
                    Pfp = pfp,
                });
            }
            else
            {
                return Ok("Error");
            }
        }
    }

    [HttpGet("/searchname/{u}")]
    public IActionResult getUserFromSearchName(string u)
    {
        var sql = "SELECT user_id,username,nickname,pfp FROM users WHERE (LOWER(username) LIKE '%' || '" + u + "' || '%') OR (LOWER(nickname) LIKE '%' || '" + u + "' || '%')";
        Console.WriteLine(sql);
        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        var allUsers = new List<User>();

        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }

                User singleUser = new User
                {
                    User_id = rdr.GetInt32(0),
                    Username = rdr.GetString(1),
                    Nickname = rdr.GetString(2),
                    Pfp = rdr.GetString(3)
                };

                allUsers.Add(singleUser);
            }
            return Ok(allUsers);
        }
    }

    [HttpGet("friendsof/{id}")]
    public IActionResult getAllFriends(int id)
    {
        var sql = "SELECT * FROM following WHERE from_id = " + id + " OR to_id = " + id;

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        var allFollowingID = new List<int>();
        var allFollowersID = new List<int>();

        using (var rdr = cmd.ExecuteReader())
        {
            while (rdr.Read())
            {

                if (!rdr.HasRows)
                {
                    return BadRequest("Error querying for user data.");
                }
                if (rdr.GetInt32(0) == id)
                {
                    allFollowingID.Add(rdr.GetInt32(1));
                }
                else
                {
                    allFollowersID.Add(rdr.GetInt32(0));
                }
            }
        }

        var intersection = allFollowersID.Intersect(allFollowingID);

        var allFriends = new List<User>();
        foreach (int friend_id in intersection)
        {
            var sql2 = "SELECT * FROM users WHERE user_id = " + friend_id;
            using var cmd2 = new NpgsqlCommand(sql2, conn);

            using (var rdr = cmd2.ExecuteReader())
            {
                if (rdr.Read())
                {
                    var user_id = rdr.GetInt32(0);
                    var username = rdr.GetString(1);
                    var email = rdr.GetString(2);
                    var password = rdr.GetString(3);
                    var biography = rdr.GetString(4);
                    var nickname = rdr.GetString(5);
                    var pfp = rdr.GetString(6);

                    Console.WriteLine(user_id);
                    Console.WriteLine(username);
                    Console.WriteLine(email);
                    Console.WriteLine(password);
                    Console.WriteLine(biography);
                    Console.WriteLine(nickname);
                    Console.WriteLine(pfp);

                    User oneFriend = new User
                    {
                        User_id = user_id,
                        Username = username,
                        Email = email,
                        Password = password,
                        Biography = biography,
                        Nickname = nickname,
                        Pfp = pfp,
                    };
                    allFriends.Add(oneFriend);
                }
            }
        }
        return Ok(allFriends);
    }

    //endpoint to follow someone
    [HttpPost("followuser")]
    public async void followUser([FromBody] FollowingPair pair)
    {

        var sql = "INSERT INTO following(from_id, to_id) VALUES (@from, @to)";

        using var conn = new NpgsqlConnection(connString);
        await using (var cmd = new NpgsqlCommand(sql, conn))
        {
            cmd.Parameters.AddWithValue("from", pair.FromID);
            cmd.Parameters.AddWithValue("to", pair.ToID);

            await cmd.ExecuteNonQueryAsync();
        }
    }

    // endpoint to check if someone is following you
    [HttpGet("checkfollow")]
    public IActionResult CheckFollow([FromQuery] FollowingPair pair)
    {
        var sql = "SELECT * FROM following WHERE from_id = " + pair.FromID + " AND to_id = " + pair.ToID;

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open)
        {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);

        using (var rdr = cmd.ExecuteReader())
        {
            if (rdr.Read())
            {
                var from_id = rdr.GetInt32(0);
                var to_id = rdr.GetInt32(1);

                Console.WriteLine(from_id);
                Console.WriteLine(to_id);

                return Ok(new FollowingPair
                {
                    FromID = from_id,
                    ToID = to_id
                });
            }
            else
            {
                return Ok("Error");
            }
        }

    }

}
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;
using System.Threading.Tasks.Dataflow;
using System.Data.SqlClient;
using Azure.Core.Serialization;
using backend.Utils;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{

    [HttpPost("passwordtest/")]
    public void passwordTest([FromBody] PasswordTEST password) {

        Console.WriteLine("Hashing password: " + password.password);

        if (password.password != null) {
            var hashedPassword = PasswordHash.HashPassword(password.password);
            Console.WriteLine(hashedPassword);
        }
    }

    [HttpPost("password/verify")]
    public bool verifyPassword([FromForm] string hashedPassword, [FromForm] string passwordInput) {

        bool verified = PasswordHash.Verify(hashedPassword, passwordInput);

        if (verified) {
            Console.WriteLine("PASSWORD IS EQUAL");
        } else {
            Console.WriteLine("PASSWORD IS NOT EQUAL");
        }
        return verified;
    }

    [HttpGet("{id}")]
    public IActionResult getOneUser(int id)
    {
        var sql = "SELECT * FROM users WHERE user_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();

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
                return NotFound("Error");
            }
        }
    }

    [HttpPost]
    public async void postUser([FromBody] User user) {
        var sql = "INSERT INTO users(username, email, password, biography, nickname, pfp) VALUES (@username, @email, @password, @biography, @nickname, @pfp)";

        try {
            using var conn = DBConn.GetConn();
            conn.Open();

            await using (var cmd = new NpgsqlCommand(sql, conn))
            {
                cmd.Parameters.AddWithValue("username", user.Username);
                cmd.Parameters.AddWithValue("email", user.Email);

                if (user.Password != null) {
                    var hashedPassword = PasswordHash.HashPassword(user.Password);
                    if (hashedPassword == null) {
                        throw new InvalidOperationException("Error hashing password");
                    }
                    cmd.Parameters.AddWithValue("password", hashedPassword);
                }            
                cmd.Parameters.AddWithValue("biography", user.Biography);
                cmd.Parameters.AddWithValue("nickname", user.Nickname);
                cmd.Parameters.AddWithValue("pfp", user.Pfp);

                await cmd.ExecuteNonQueryAsync();
            }
        } catch (Exception ex) {
            Console.WriteLine("Error creating/posting new user");
            Console.Write(ex);
        }
    }

    [HttpPut]
    public async void editUser([FromBody] User user) {
        var sql = "UPDATE users SET username = @username, email = @email, password = @password, biography = @biography, nickname = @nickname, pfp = @pfp  where user_id = @user_id";
        // Console.WriteLine(sql);
        using var conn = DBConn.GetConn();
        conn.Open();
        await using (var cmd = new NpgsqlCommand(sql, conn))
        {
            cmd.Parameters.AddWithValue("username", user.Username);
            cmd.Parameters.AddWithValue("email", user.Email);
            cmd.Parameters.AddWithValue("password", user.Password);
            cmd.Parameters.AddWithValue("biography", user.Biography);
            cmd.Parameters.AddWithValue("nickname", user.Nickname);
            cmd.Parameters.AddWithValue("pfp", user.Pfp);
            cmd.Parameters.AddWithValue("user_id",user.User_id);

            await cmd.ExecuteNonQueryAsync();
        }
    }


    [HttpGet("all")]
    public IActionResult getAllUsers()
    {
        var sql = "SELECT * FROM users";
        Console.WriteLine(sql);

        using var conn = DBConn.GetConn();
        conn.Open();
        
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
        var sql = "SELECT from_id FROM following WHERE to_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var allFollowersID = new List<int>();

        using (var rdr = cmd.ExecuteReader())
        {
            if (!rdr.HasRows)
            {
                return NotFound("No followers found.");
            }
            while (rdr.Read())
            {
                allFollowersID.Add(rdr.GetInt32(0));
            }
        }
        var allFollowers = new List<User>();
        foreach (int follower_id in allFollowersID)
        {
            var sql2 = "SELECT * FROM users WHERE user_id = " + follower_id;

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

                    // Console.WriteLine(user_id);
                    // Console.WriteLine(username);
                    // Console.WriteLine(email);
                    // Console.WriteLine(password);
                    // Console.WriteLine(biography);
                    // Console.WriteLine(nickname);
                    // Console.WriteLine(pfp);

                    User oneFollower = new User
                    {
                        User_id = user_id,
                        Username = username,
                        Email = email,
                        Password = password,
                        Biography = biography,
                        Nickname = nickname,
                        Pfp = pfp,
                    };
                    allFollowers.Add(oneFollower);
                }
            }
        }
        return Ok(allFollowers);
    //     // --- query list of follower IDs ---
    //     var follower_query = "SELECT from_id FROM following WHERE to_id = " + id;
    //     Console.WriteLine(follower_query);

    //     using var conn = DBConn.GetConn();
    //     conn.Open();

    //     using var cmd = new NpgsqlCommand(follower_query, conn);

    //     List<int> followerIDs = [];
    //     using (var rdr = cmd.ExecuteReader())
    //     {
    //         if (!rdr.HasRows)
    //         {
    //             return NotFound("No followers found.");
    //         }

    //         while (rdr.Read())
    //         {

    //             followerIDs.Add(rdr.GetInt32(0));
    //         }
    //     }

    //     // --- query each follower's basic info ---
    //     var followers = new List<Follower>();
    //     foreach (int follower_id in followerIDs)
    //     {
    //         var follower_info_query = "SELECT user_id, username, nickname, pfp FROM users WHERE user_id = " + follower_id;
    //         using var cmd2 = new NpgsqlCommand(follower_info_query, conn);

    //         using var rdr = cmd2.ExecuteReader();
    //         while (rdr.Read())
    //         {

    //             if (!rdr.HasRows)
    //             {
    //                 return BadRequest("Error querying for user data.");
    //             }

    //             Follower follower = new Follower;
    //             {
    //                 UserID = rdr.GetInt32(0),
    //                 Username = rdr.GetString(1),
    //                 Nickname = rdr.GetString(2),
    //                 PFP_URL = rdr.GetString(3)
    //             };

    //             followers.Add(follower);
    //         }
    //     }
    //     return Ok(followers);
    // }
    }

    [HttpGet("following/{id}")]
    public IActionResult GetAllFollowing(int id)
    {
        var sql = "SELECT to_id FROM following WHERE from_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var allFollowingsID = new List<int>();

        using (var rdr = cmd.ExecuteReader())
        {
            if (!rdr.HasRows)
            {
                return NotFound("No followings found.");
            }
            while (rdr.Read())
            {
                allFollowingsID.Add(rdr.GetInt32(0));
            }
        }
        var allFollowings = new List<User>();
        foreach (int following_id in allFollowingsID)
        {
            var sql2 = "SELECT * FROM users WHERE user_id = " + following_id;

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

                    // Console.WriteLine(user_id);
                    // Console.WriteLine(username);
                    // Console.WriteLine(email);
                    // Console.WriteLine(password);
                    // Console.WriteLine(biography);
                    // Console.WriteLine(nickname);
                    // Console.WriteLine(pfp);

                    User oneFollowing = new User
                    {
                        User_id = user_id,
                        Username = username,
                        Email = email,
                        Password = password,
                        Biography = biography,
                        Nickname = nickname,
                        Pfp = pfp,
                    };
                    allFollowings.Add(oneFollowing);
                }
            }
        }
        return Ok(allFollowings);
    }

    [HttpGet("followCounts/{id}")]
    public IActionResult GetFollowCounts(int id)
    {
        // get follower count
        var sql = "SELECT * FROM following WHERE from_id = " + id + " OR to_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        var allFollowingID = new List<int>();
        var allFollowersID = new List<int>();
        var followCounts = Enumerable.Repeat(0, 3).ToList();

        using (var rdr = cmd.ExecuteReader())
        {
            if (!rdr.HasRows)
            {
                return Ok(followCounts);
            }

            while (rdr.Read())
            {

                
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
        
        
        // if (intersection.Count() == 0)
        // {
        //     return NotFound("No friends found.");
        // }

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

                    // Console.WriteLine(user_id);
                    // Console.WriteLine(username);
                    // Console.WriteLine(email);
                    // Console.WriteLine(password);
                    // Console.WriteLine(biography);
                    // Console.WriteLine(nickname);
                    // Console.WriteLine(pfp);

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

        // followCounts.Add(allFollowersID.Count);
        // followCounts.Add(allFollowingID.Count);
        // followCounts.Add(allFriends.Count);
        followCounts[0] = allFollowersID.Count;
        followCounts[1] = allFollowingID.Count;
        followCounts[2] = allFriends.Count;

        return Ok(followCounts);
    }

    [HttpDelete("following")]
    public async Task<IActionResult> UnfollowUser([FromQuery]FollowingPairQuery unfollowQuery) {
        var sql = "DELETE FROM following WHERE from_id = @from_id AND to_id = @to_id";

        try {
            using var conn = DBConn.GetConn();
            conn.Open();

            using var cmd = new NpgsqlCommand(sql, conn);
            cmd.Parameters.AddWithValue("from_id", unfollowQuery.User_1);
            cmd.Parameters.AddWithValue("to_id", unfollowQuery.User_2);
            var result = await cmd.ExecuteNonQueryAsync();
            if (result == 0)
            {
                return NotFound("ERROR: user id " + unfollowQuery.User_1 + " is not following user id " +  unfollowQuery.User_2);
            }

            return NoContent();
        } catch (Exception ex) {
            Console.Write(ex);
            return StatusCode(500, "Error making request to unfollow user");
        }
    }


    [HttpGet("{id}/saved/")]
    public IActionResult getUserSaves(int id) {
        var sql = "SELECT * FROM post JOIN save ON save.post_id = post.post_id JOIN users ON save.user_id = users.user_id WHERE users.user_id = " + id;

        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var saves = new List<Post>();

        if (!reader.HasRows)
        {
            return NotFound("No saves found.");
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
    public IActionResult getSaveDataTEMP() {
        var sql = "SELECT * FROM save";

        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var saves = new List<Saved_Temp>();

        if (!reader.HasRows)
        {
            return NotFound("User not found.");
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
        var sql = "SELECT * FROM conversation";
        // Console.WriteLine(sql);

        using var conn = DBConn.GetConn();
        conn.Open();
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
        var sql = "SELECT * FROM message";
        // Console.WriteLine(sql);
        
        using var conn = DBConn.GetConn();
        conn.Open();
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
        // var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users WHERE email = '" + e + "'";
        // Console.WriteLine(sql);

       using var conn = DBConn.GetConn();
       conn.Open();

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

                // Console.WriteLine(user_id);
                // Console.WriteLine(username);
                // Console.WriteLine(email);
                // Console.WriteLine(password);
                // Console.WriteLine(biography);
                // Console.WriteLine(nickname);
                // Console.WriteLine(pfp);

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
                return NotFound("User not found.");
            }
        }
    }

    [HttpGet("/username/{u}")]
    public IActionResult getUserFromUsername(string u)
    {
        var sql = "SELECT * FROM users WHERE username = '" + u + "'";
        // Console.WriteLine(sql);

        using var conn = DBConn.GetConn();
        conn.Open();
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
                return NotFound("User not found.");
            }
        }
    }

    [HttpGet("/searchname/{u}")]
    public IActionResult getUserFromSearchName(string u)
    {
        var sql = "SELECT user_id,username,nickname,pfp FROM users WHERE (LOWER(username) LIKE '%' || '" + u.ToLower() + "' || '%') OR (LOWER(nickname) LIKE '%' || '" + u.ToLower() + "' || '%')";
        // Console.WriteLine(sql);
        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        var allUsers = new List<User>();

        using (var rdr = cmd.ExecuteReader())
        {
            if (!rdr.HasRows)
            {
                return NotFound("User not found.");
            }

            while (rdr.Read())
            {

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

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        var allFollowingID = new List<int>();
        var allFollowersID = new List<int>();

        using (var rdr = cmd.ExecuteReader())
        {
            if (!rdr.HasRows)
            {
                return NotFound("No friends found.");
            }

            while (rdr.Read())
            {

                
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

        if (intersection.Count() == 0)
        {
            return NotFound("No friends found.");
        }

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

                    // Console.WriteLine(user_id);
                    // Console.WriteLine(username);
                    // Console.WriteLine(email);
                    // Console.WriteLine(password);
                    // Console.WriteLine(biography);
                    // Console.WriteLine(nickname);
                    // Console.WriteLine(pfp);

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
    public async void followUser([FromBody] FollowingPairQuery pair)
    {

        var sql = "INSERT INTO following(from_id, to_id) VALUES (@from, @to)";

        using var conn = DBConn.GetConn();
        conn.Open();
        await using (var cmd = new NpgsqlCommand(sql, conn))
        {
            cmd.Parameters.AddWithValue("from", pair.User_1);
            cmd.Parameters.AddWithValue("to", pair.User_2);

            await cmd.ExecuteNonQueryAsync();
        }

    }

    // endpoint to check if someone is following you
    [HttpGet("checkfollow")]
    public IActionResult CheckFollow([FromQuery] FollowingPairQuery pair)
    {
        // Console.WriteLine(pair.User_1);
        // Console.WriteLine(pair.User_2);

        var sql = "SELECT * FROM following WHERE from_id = " + pair.User_1 + " AND to_id = " + pair.User_2;

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);

        using (var rdr = cmd.ExecuteReader())
        {
            if (rdr.Read())
            {
                var from_id = rdr.GetInt32(0);
                var to_id = rdr.GetInt32(1);

                // Console.WriteLine(from_id);
                // Console.WriteLine(to_id);

                return Ok(new FollowingPairQuery
                {
                    User_1 = from_id,
                    User_2 = to_id
                });
            }
            else
            {
                return Ok(new FollowingPairQuery {
                    User_1 = -1,
                    User_2 = -1
                });
            }
        }

    }

}
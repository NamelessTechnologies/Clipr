using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class FollowerController : ControllerBase {

    private string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

    // returns list of user's followers (their id, username, nickname, pfp url)
    [HttpGet("{id}")]
    public IActionResult GetAllFollowers(int id) 
    {

        // --- query list of follower IDs ---
        var follower_query = "SELECT * FROM following WHERE to_id = " + id;

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

        foreach (int follower_id in followerIDs) {
            Console.WriteLine(follower_id);
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
}
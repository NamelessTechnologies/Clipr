using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;
using System.Threading.Tasks.Dataflow;
using System.Data.SqlClient;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]

public class UserController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult getOneUser(int id)
    {

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users WHERE user_id = " + id;
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
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

                Console.WriteLine(user_id);
                Console.WriteLine(username);
                Console.WriteLine(email);
                Console.WriteLine(password);
                Console.WriteLine(biography);
                Console.WriteLine(nickname);

                return Ok(new User
                {
                    User_id = user_id,
                    Username = username,
                    Email = email,
                    Password = password,
                    Biography = biography,
                    Nickname = nickname
                });
            }
            else
            {
                return Ok("Error");
            }
        }
    }


    [HttpGet("all")]
    public IActionResult getAllUsers()
    {

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM users";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
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
                    Nickname = rdr.GetString(5)
                };

                allUsers.Add(singleUser);
            }
            return Ok(allUsers);
        }
    }

    [HttpGet("convo/all")]
    public IActionResult getAllConversations()
    {

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM conversation";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
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

        var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
        var sql = "SELECT * FROM message";
        Console.WriteLine(sql);

        using var conn = new NpgsqlConnection(connString);
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
}
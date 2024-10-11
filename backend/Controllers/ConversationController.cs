using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class ConversationController : ControllerBase
{
    private NpgsqlConnection conn;
    private String connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

    public ConversationController(){
        conn = DBConn.Instance().getConn();
    }

    [HttpPost]
    public async void PostConversation([FromBody] Conversation conversation) {
        var sql = "INSERT INTO conversation (user_id, user_id_2) VALUES(@user_id, @user_id_2);";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open) {
            conn.Open();
        }

        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("user_id", conversation.User_id);
            cmd.Parameters.AddWithValue("user_id_2", conversation.User_id_2);
            await cmd.ExecuteNonQueryAsync();
        }
    }

    [HttpGet]
    public IActionResult GetAllConversationMessages([FromQuery]ConversationMessagesQuery conversation) {
        var sql = "SELECT * FROM Message WHERE convo_id = (select id FROM Conversation WHERE user_id= " + conversation.User_1 + " and user_id_2= " + conversation.User_2 + ");";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open) {
            conn.Open();
        }

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();

        var messages = new List<Message>();

        if (!reader.HasRows) {
            return BadRequest("No messages for convo");
        }

        while (reader.Read()) {
            Message message = new Message {
                Id = reader.GetInt32(0),
                Convo_id = reader.GetInt32(1),
                Content = reader.GetString(2),
                Datesent = reader.GetDateTime(3),
                User_id = reader.GetInt32(4)
            };
            messages.Add(message);
        }
        return Ok(messages);
    }

    [HttpPost("message")]
    public async void PostMessage([FromBody] Message message) {

        var sql = "INSERT INTO message (convo_id, content, datesent, user_id) VALUES (@convo_id, @content, @datesent, @user_id);";

        using var conn = new NpgsqlConnection(connString);
        if (conn.State != System.Data.ConnectionState.Open) {
            conn.Open();
        }

        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("convo_id", message.Convo_id);
            cmd.Parameters.AddWithValue("content", message.Content);
            cmd.Parameters.AddWithValue("datesent", message.Datesent);
            cmd.Parameters.AddWithValue("user_id", message.User_id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}

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

    [HttpPost]
    public async Task<IActionResult> PostConversation([FromBody] Conversation conversation) {
        try {
        var sql = "INSERT INTO conversation (user_id, user_id_2) VALUES(@user_id, @user_id_2) returning id;";

        using var conn = DBConn.GetConn();
        conn.Open();
        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("user_id", conversation.User_id);
            cmd.Parameters.AddWithValue("user_id_2", conversation.User_id_2);
            var insertedId = (int) await cmd.ExecuteScalarAsync();
            // Console.WriteLine("insertedId: " + insertedId);
            return Ok(new {id = insertedId});
        }
        } catch (Exception e) {
            return (OkObjectResult)StatusCode(500, new { error = e.Message });
        }
    }

    [HttpGet]
    public IActionResult GetAllConversationMessages([FromQuery]ConversationMessagesQuery conversation) {
        var sql = "SELECT * FROM Message WHERE convo_id = (select id FROM Conversation WHERE (user_id= " + conversation.User_1 + " and user_id_2= " + conversation.User_2 + ") or"+"(user_id= " + conversation.User_2 + " and user_id_2= " + conversation.User_1 + "));";

        using var conn = DBConn.GetConn();
        conn.Open();
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

    [HttpGet("convoid")]
    public IActionResult GetConvoID([FromQuery]ConversationMessagesQuery conversation) {
        var sql = "select * FROM Conversation WHERE (user_id= " + conversation.User_1 + " and user_id_2= " + conversation.User_2 + ") or "+"(user_id= " + conversation.User_2 + " and user_id_2= " + conversation.User_1 + ");";

        using var conn = DBConn.GetConn();
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        var reader = cmd.ExecuteReader();
        Conversation convo = new Conversation();


        if (!reader.HasRows) {
            Conversation bad_convo = new Conversation {
                Id = -1,
                User_id = -1,
                User_id_2 = -1
            };
            return BadRequest(bad_convo);
        }

        while (reader.Read()) {
            convo.Id = reader.GetInt32(0);
            convo.User_id = reader.GetInt32(1);
            convo.User_id_2 = reader.GetInt32(2);
        }
        return Ok(convo);
    }

    [HttpPost("message")]
    public async void PostMessage([FromBody] Message message) {

        var sql = "INSERT INTO message (convo_id, content, datesent, user_id) VALUES (@convo_id, @content, @datesent, @user_id);";
        using var conn = DBConn.GetConn();
        conn.Open();
        
        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("convo_id", message.Convo_id);
            cmd.Parameters.AddWithValue("content", message.Content);
            cmd.Parameters.AddWithValue("datesent", message.Datesent);
            cmd.Parameters.AddWithValue("user_id", message.User_id);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}

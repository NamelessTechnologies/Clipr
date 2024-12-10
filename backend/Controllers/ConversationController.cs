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

    [HttpGet("getConvoPageInfo/{user_id}")]
    public IActionResult getConvoPageInfo(int user_id) {
        var sql = @"
        WITH nickname_table AS (
            SELECT user_id as other_user_id, nickname FROM users WHERE USER_ID IN 
            (SELECT user_id_2 as other_user_id FROM conversation WHERE user_id = @user_id UNION 
            SELECT user_id as other_user_id FROM conversation WHERE user_id_2 = @user_id)
        ), convo_table AS (
            SELECT id as conversation_id, user_id as current_user_id, user_id_2 as other_user_id FROM conversation WHERE user_id = @user_id
            UNION
            SELECT id as conversation_id, user_id_2 as current_user_id, user_id as other_user_id FROM conversation WHERE user_id_2 = @user_id
        ), date_table AS  (
            SELECT MAX(convo_id) as conversation_id, MAX(datesent) as latest_message_date FROM message 
            WHERE convo_id IN (SELECT id as conversation_id FROM conversation WHERE user_id = @user_id UNION SELECT id as conversation_id FROM conversation WHERE user_id_2 = @user_id)
            GROUP BY convo_id
        ), message_table AS (
            SELECT convo_id as conversation_id, content FROM message WHERE datesent IN (SELECT MAX(datesent) as latest_message_date FROM message 
            WHERE convo_id IN (SELECT id as conversation_id FROM conversation WHERE user_id = @user_id UNION SELECT id as conversation_id FROM conversation WHERE user_id_2 = @user_id)
            GROUP BY convo_id)
        )
        SELECT convo_table.*, nickname_table.nickname as other_user_nickname, message_table.content as latest_message, date_table.latest_message_date FROM nickname_table 
        INNER JOIN convo_table ON nickname_table.other_user_id = convo_table.other_user_id
        INNER JOIN date_table ON date_table.conversation_id = convo_table.conversation_id
        INNER JOIN message_table ON message_table.conversation_id = convo_table.conversation_id
        ORDER BY latest_message_date DESC";

        using var conn = DBConn.GetConn();
        conn.Open();
        using var cmd = new NpgsqlCommand(sql, conn);
        cmd.Parameters.AddWithValue("@user_id", user_id);

        var reader = cmd.ExecuteReader();

        var all_conversations = new List<ConversationInfo>();

        if (!reader.HasRows) {
            return BadRequest("No conversations found");
        }

        while (reader.Read()) {
            var conversationInfo = new ConversationInfo {
                Conversation_Id = reader.GetInt32(0),
                Current_User_Id = reader.GetInt32(1),
                Other_User_Id = reader.GetInt32(2),
                Other_User_Nickname = reader.GetString(3),
                Latest_Message = reader.GetString(4),
                Latest_Message_Date = reader.GetDateTime(5)
            };
            all_conversations.Add(conversationInfo);
        }
        return Ok(all_conversations);
    }

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
        // var sql = "SELECT * FROM Message WHERE convo_id = (select id FROM Conversation WHERE (user_id= " + conversation.User_1 + " and user_id_2= " + conversation.User_2 + ") or"+"(user_id= " + conversation.User_2 + " and user_id_2= " + conversation.User_1 + "));";
        var sql = "SELECT Message.*, users.pfp FROM Message INNER JOIN users ON message.user_id = users.user_id WHERE convo_id = (select id FROM Conversation WHERE (user_id= " + conversation.User_1 + " and user_id_2= " + conversation.User_2 + ") or"+"(user_id= " + conversation.User_2 + " and user_id_2= " + conversation.User_1 + "));";

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
                User_id = reader.GetInt32(4),
                User_pfp = reader.GetString(5)
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

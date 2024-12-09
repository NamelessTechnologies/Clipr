using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;
namespace backend.Controllers;
[ApiController]
[Route("[controller]")]
public class MediaController : ControllerBase {
    [HttpPost("postMedia")]
    public async void postMedia([FromForm] int post_id, [FromForm] string url) {
        var sql = "INSERT INTO media (post_id, url) VALUES(@post_id, @url)";
        using var conn = DBConn.GetConn();
        conn.Open();
        await using (var cmd = new NpgsqlCommand(sql, conn)) {
            cmd.Parameters.AddWithValue("post_id", post_id);
            cmd.Parameters.AddWithValue("url", url);
            await cmd.ExecuteNonQueryAsync();
        }
    }
}
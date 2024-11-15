namespace CliprBackendTest;

using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using backend.Models;
using Xunit;

public class CommentLiveTest : IDisposable
{
    private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5001") };

    [Fact]
    public async Task GetCommentssOfUser_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/comment/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }
    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }

}
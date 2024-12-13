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

    // -------------------------- EXPECTING NOTFOUND --------------------------

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

    [Fact]
    public async Task Test_GetCommentsByPostandUser_ReturnsNotFoundWhenPostIdDoesntExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/comment/post/0/1");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "No Comments";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

    }

    [Fact]
    public async Task Test_GetCommentsByPostandUser_ReturnsNotFoundWhenUserIdDoesntExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/comment/post/2/0");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "No Comments";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

    }

    // ------------------------------ RETURNS SOMETHING ------------------------------
    [Fact]
    // [InlineData("{\"id\": 1, \"parentID\": null, \"postID\": 5, \"userID\": 1, \"content\": \"This is a great post!\"}")]
    public async Task GetCommentOne_ReturnsSomething()
    {
        // Arrange
        // var ExpectedComment = JsonSerializer.Deserialize<Comment>(expectedJson);

        // Act
        var response = await _httpClient.GetAsync("/comment/1");
        var content = await response.Content.ReadAsStringAsync();
        var ActualComment = JsonSerializer.Deserialize<Comment>(content);

        // Assert
        // Assert.Equal(ExpectedComment.ID, ActualComment.ID);
        // Assert.Equal(ExpectedComment.ParentID, ActualComment.ParentID);
        // Assert.Equal(ExpectedComment.PostID, ActualComment.PostID);
        // Assert.Equal(ExpectedComment.UserID, ActualComment.UserID);
        // Assert.Equal(ExpectedComment.Content, ActualComment.Content);

        Assert.NotNull(ActualComment);

        this.Dispose();
    }


    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }

}
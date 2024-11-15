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

public class PostLiveTest : IDisposable
{
    private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5001") };


// ----------------- EXPECTING NOTFOUND -----------------

    [Fact]
    public async Task GetPostsOfUser_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/post/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found/No posts.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetTempPostsOfUser_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/TEMP_post/user_id/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No posts found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetTempPostsOfValidUser_ReturnsNotFound_WhenUserHasNoPosts()
    {

        // Act
        var response = await _httpClient.GetAsync("/TEMP_post/user_id/4"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No posts found.", content);
        this.Dispose();
    }

// ----------------- EXPECTING OUTPUT -----------------

    [Theory]
    [InlineData("{\"postID\": 1, \"userID\": 1, \"title\": \"Healthy Living Habits\", \"description\": \"Simple habits that can help you live a healthier life.\", \"datePosted\": \"2023-07-30T00:00:00\", \"mediaType\": \"text\"}")]
    public async Task GetPost1_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange
        var expectedPost = JsonSerializer.Deserialize<Post>(expectedJson);

        // Act
        var response = await _httpClient.GetAsync("/post/1");
        var content = await response.Content.ReadAsStringAsync();
        var ActualPost = JsonSerializer.Deserialize<Post>(content);

        // Assert: Compare the expected and actual Post
            Assert.Equal(expectedPost.PostID, ActualPost.PostID);
            Assert.Equal(expectedPost.UserID, ActualPost.UserID);
            Assert.Equal(expectedPost.Title, ActualPost.Title);
            Assert.Equal(expectedPost.Description, ActualPost.Description);
            Assert.Equal(expectedPost.DatePosted, ActualPost.DatePosted);
            Assert.Equal(expectedPost.MediaType, ActualPost.MediaType);

        this.Dispose();
    }

    [Theory]
    [InlineData("{\"userID\": 1, \"title\": \"pls work\", \"content\": \"jwoeafpijsd\"}")]
    public async Task GetTempPost1_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange
        var expectedPost = JsonSerializer.Deserialize<TEMP_Post>(expectedJson);

        // Act
        var response = await _httpClient.GetAsync("/TEMP_post/1");
        var content = await response.Content.ReadAsStringAsync();
        var ActualPost = JsonSerializer.Deserialize<TEMP_Post>(content);

        // Assert: Compare the expected and actual Post
            Assert.Equal(expectedPost.UserID, ActualPost.UserID);
            Assert.Equal(expectedPost.Title, ActualPost.Title);
            Assert.Equal(expectedPost.Content, ActualPost.Content);

        this.Dispose();
    }

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }

}
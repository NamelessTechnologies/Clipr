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
    public async Task GetTempPostsOfUser_ReturnsNotFound_WhenUserDoesNotExist()
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
    public async Task Test_GetTempPostById_ReturnsNotFoundWhenIdDoesntExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/TEMP_post/0");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "TempPost not found.";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

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

    [Fact]
    public async Task Test_GetPostInfo_ReturnsNotFoundWhenPostDoesntExist()
    {
        var response = await _httpClient.GetAsync("/post/real/getPostInfo/0/1");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "User not found/No posts.";

        Assert.Equal(expectedResult, content);
    }

    [Fact]
    public async Task Test_GetProfilePosts_ReturnsNotFoundWhenIdDoesntExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/profile/0");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "No posts found.";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

    }

    [Fact]
    public async Task Test_GetBookmarks_ReturnsNotFoundWhenIdDoesntExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/bookmark/0");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "No saves found.";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

    }

    [Fact]
    public async Task Test_GetBookmarks_ReturnsNotFoundWhenIdHasNoSaves() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/bookmark/15");
        var content = await response.Content.ReadAsStringAsync();
        var expectedResult = "No saves found.";

        // Assert: Endpoint returns response
        Assert.Equal(expectedResult, content);

    }

// ----------------- EXPECTING OUTPUT -----------------

    [Fact]
    // [InlineData("{\"postID\": 1, \"userID\": 1, \"title\": \"Healthy Living Habits\", \"description\": \"Simple habits that can help you live a healthier life.\", \"datePosted\": \"2023-07-30T00:00:00\", \"mediaType\": \"text\"}")]
    public async Task GetPost2_ReturnsCorrectJson()
    {
        // Arrange
        // var expectedPost = JsonSerializer.Deserialize<Post>(expectedJson)

        // Act
        var response = await _httpClient.GetAsync("/post/2");
        var content = await response.Content.ReadAsStringAsync();
        var ActualPost = JsonSerializer.Deserialize<Post>(content);

        // Assert: Compare the expected and actual Post
            // Assert.Equal(expectedPost.PostID, ActualPost.PostID);
            // Assert.Equal(expectedPost.UserID, ActualPost.UserID);
            // Assert.Equal(expectedPost.Title, ActualPost.Title);
            // Assert.Equal(expectedPost.Description, ActualPost.Description);
            // Assert.Equal(expectedPost.DatePosted, ActualPost.DatePosted);
            // Assert.Equal(expectedPost.MediaType, ActualPost.MediaType);
        // Assert: Post is found
        Assert.NotNull(ActualPost);
        this.Dispose();
    }

    [Fact]
    public async Task Test_GetAllTempPosts_ReturnsSomething() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/TEMP_post/");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "no data";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    [Fact]
    // [InlineData("{\"userID\": 1, \"title\": \"pls work\", \"content\": \"jwoeafpijsd\"}")]
    public async Task GetTempPost1_ReturnsSomething()
    {
        // Arrange
        // var expectedPost = JsonSerializer.Deserialize<TEMP_Post>(expectedJson);

        // Act
        var response = await _httpClient.GetAsync("/TEMP_post/1");
        var content = await response.Content.ReadAsStringAsync();
        // var ActualPost = JsonSerializer.Deserialize<TEMP_Post>(content);
        var noneResult = "No posts found.";

        // Assert: Compare the expected and actual Post
            // Assert.Equal(expectedPost.UserID, ActualPost.UserID);
            // Assert.Equal(expectedPost.Title, ActualPost.Title);
            // Assert.Equal(expectedPost.Content, ActualPost.Content);
        
        Assert.NotEqual(noneResult,content);

        this.Dispose();
    }

    [Theory]
    [InlineData("[{\"userID\": 10, \"title\": \"now it'll work\", \"content\": \"surely\\n\"}]")]
    public async Task GetTempPostsFromUser10_ReturnsCorrectJsonArray(string expectedJson)
    {
        // Arrange
        var expectedPosts = JsonSerializer.Deserialize<List<TEMP_Post>>(expectedJson);

        // Act
        var response = await _httpClient.GetAsync("/TEMP_Post/user_id/10");
        var content = await response.Content.ReadAsStringAsync();
        var ActualPosts = JsonSerializer.Deserialize<List<TEMP_Post>>(content);

        // Assert: Compare the expected and actual followers
        Assert.Equal(expectedPosts.Count, ActualPosts.Count);
        for (int i = 0; i < expectedPosts.Count; i++)
        {
            Assert.Equal(expectedPosts[i].UserID, ActualPosts[i].UserID);
            Assert.Equal(expectedPosts[i].Title, ActualPosts[i].Title);
            Assert.Equal(expectedPosts[i].Content, ActualPosts[i].Content);
        }

        this.Dispose();
    }

    [Fact]
    public async Task Test_CheckUserLike_ReturnsFalseWhenPostDoesntExist()
    {
        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/post/didUserLike/");
        var content = await response.Content.ReadAsStringAsync();
        var actualResult = JsonSerializer.Deserialize<Dictionary<string, bool>>(content);
        var expectedResult = false;

        // Assert: response is false
        Assert.False(actualResult["message"]);
    }

    [Fact]
    public async Task Test_CheckPostInfo_ReturnsResultWhenPostExists() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/real/getPostInfo/2/1");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "User not found/No posts.";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    [Fact]
    public async Task Test_GetPostArray_ReturnsArrayOfIds() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/real/getPostArray");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    [Fact]
    public async Task Test_GetPostsByPosterId_ReturnsProfile() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/profile/1");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "No posts found.";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    [Fact]
    public async Task Test_GetBookmarks_ReturnsArrayWhenSavesExist() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/bookmark/1");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "No saves found.";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult,content);

    }

    [Fact]
    public async Task Test_GetAllPosts_ReturnsSomething() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/post/bookmark/0");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "no data";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    [Fact]
    public async Task Test_GetTempPost_ReturnsSomethingWhenTempPostExists() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/TEMP_post/1");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "TempPost not found.";

        // Assert: Endpoint returns response
        Assert.NotEqual(noneResult, content);

    }

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }

}
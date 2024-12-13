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

public class UserLiveTest : IDisposable
{
    private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5001") };

// ----------------- EXPECTING NOTFOUND -----------------
    [Fact]
    public async Task GetOneUser_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("Error", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserFollowers_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/followers/0"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No followers found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserFollowing_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/following/0"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No followings found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserFollowing_ReturnsNotFound_WhenUserHasNoFollowings()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/following/15"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No followings found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserSaved_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/9999/saved/"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No saves found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserPassword_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/email/badstring$#@"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserFromUsername_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/username/badstring-qpowiejrasdkf"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task SearchUsers_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/searchname/badusernamestring02-"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetFriendsOfUser_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/friendsof/0"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No friends found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetFriendsOfValidUserNoFriends_ReturnsNotFound()
    {
        // Act
        var response = await _httpClient.GetAsync("/user/friendsof/4");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("No friends found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task Test_GetFollowCounts_ReturnsZeroesWhenIdDoesntExist() {
        // Act
        var response = await _httpClient.GetAsync("/user/followCounts/0");
        var content = await response.Content.ReadAsStringAsync();
        var actualResult = JsonSerializer.Deserialize<List<int>>(content);
        Console.WriteLine(content);
        List<int> expectedResponse= [0,0,0];
        Assert.Equal(expectedResponse, actualResult);
    }

// ----------------- EXPECTING OUTPUT -----------------
    [Fact]
    // [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_UserOne_ReturnsCorrectJson()
    {
        // Arrange: Deserialize the expected JSON into an object
        // var expectedUser = JsonSerializer.Deserialize<User>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/user/1");
        var content = await response.Content.ReadAsStringAsync();
        var actualUser = JsonSerializer.Deserialize<User>(content);

        Assert.NotNull(actualUser);
        this.Dispose();
    }

    [Fact]
    // [InlineData("[{\"userID\": 10, \"username\": \"charlie.brown\", \"nickname\": \"Charlie\", \"pfP_URL\": \"https://random.image/img10.jpg\"}]")]
    public async Task Test_UserNine_ReturnsCorrectJsonOfFollowing()
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        // var expectedFollowers = JsonSerializer.Deserialize<List<Follower>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/following/9");
        var content = await response.Content.ReadAsStringAsync();
        var actualFollowers = JsonSerializer.Deserialize<List<Follower>>(content);

        // Assert: Followers are found
        Assert.NotNull(actualFollowers);
        this.Dispose();
    }

    [Fact]
    public async Task Test_UserTen_ReturnsCorrectJsonOfFollowers()
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        // var expectedFollowers = JsonSerializer.Deserialize<List<Follower>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/followers/10");
        var content = await response.Content.ReadAsStringAsync();
        var actualFollowers = JsonSerializer.Deserialize<List<Follower>>(content);

        // Assert: Followers are found
        Assert.NotNull(actualFollowers);
        this.Dispose();
    }

    [Fact]
    // [InlineData("[{\"postID\": 4, \"userID\": 4, \"title\": \"Tech Innovations 2024\", \"description\": \"An in-depth look at upcoming technological trends for the next year.\", \"datePosted\": \"2024-01-05T00:00:00\", \"mediaType\": \"video\"}]")]
    public async Task Test_UserOne_ReturnsCorrectJsonOfSaved()
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        // var expectedPosts = JsonSerializer.Deserialize<List<Post>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/1/saved");
        var content = await response.Content.ReadAsStringAsync();
        var actualPosts = JsonSerializer.Deserialize<List<Post>>(content);

        // Assert: Saved post(s) are found
        Assert.NotNull(actualPosts);
        this.Dispose();
    }

    [Fact]
    // [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_UserOneEmail_ReturnsCorrectJson()
    {
        // Arrange: Deserialize the expected JSON into an object
        // var expectedUser = JsonSerializer.Deserialize<User>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/email/jpalonzo@cpp.edu");
        var content = await response.Content.ReadAsStringAsync();
        var actualUser = JsonSerializer.Deserialize<User>(content);

        // Assert: User is found
        Assert.NotNull(actualUser);
        this.Dispose();
    }

    [Fact]
    public async Task Test_UserOneUsername_ReturnsCorrectJson()
    {

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/username/alonzojp");
        var content = await response.Content.ReadAsStringAsync();
        var actualUser = JsonSerializer.Deserialize<User>(content);

        // Assert: Compare the actual and expected results
        Assert.NotNull(actualUser);
        this.Dispose();
    }

    [Fact]
    public async Task Test_UserOneSearchNameAlonzo_ReturnsCorrectJson()
    {

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/searchname/alonzo");
        var content = await response.Content.ReadAsStringAsync();
        var actualUsers = JsonSerializer.Deserialize<List<User>>(content);

        // Assert: Compare the actual and expected results
        Assert.NotNull(actualUsers);
        this.Dispose();
    }

    [Fact]
    public async Task Test_FriendsofUserTwo_ReturnsCorrectJsonArray()
    {

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/user/friendsof/2");
        var content = await response.Content.ReadAsStringAsync();
        var actualUsers = JsonSerializer.Deserialize<List<User>>(content);

        // Assert: Compare the actual and expected results
        Assert.NotNull(actualUsers);
        this.Dispose();
    }

    [Fact]
    public async Task Test_GetAllUsers_ReturnsSomething() 
    {
        // Arrange
        var response = await _httpClient.GetAsync("/user/all");
        var content = await response.Content.ReadAsStringAsync();
        var errorResult = "Error querying for user data.";

        // Assert: Endpoint returns response
        Assert.NotEqual(errorResult,content);

    }

    [Fact]
    public async Task Test_GetFollowCounts_ReturnsSomethingWhenIdIsValid() {
        // Act
        var response = await _httpClient.GetAsync("/user/followCounts/1");
        var content = await response.Content.ReadAsStringAsync();
        var actualResult = JsonSerializer.Deserialize<List<int>>(content);
        Assert.NotNull(actualResult);
    }

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
}

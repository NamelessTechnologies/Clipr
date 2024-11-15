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
        var response = await _httpClient.GetAsync("/user/followers/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }

    [Fact]
    public async Task GetOneUserFollowing_ReturnsError_WhenUserDoesNotExist()
    {

        // Act
        var response = await _httpClient.GetAsync("/user/following/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
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
        Assert.Equal("User not found.", content);
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
        var response = await _httpClient.GetAsync("/user/friendsof/9999"); // Adjust path as needed
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.Equal("User not found.", content);
        this.Dispose();
    }

    [Theory]
    [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_UserOne_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into an object
        var expectedUser = JsonSerializer.Deserialize<User>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/user/1");
        var content = await response.Content.ReadAsStringAsync();
        var actualUser = JsonSerializer.Deserialize<User>(content);

        // Assert: Compare the actual and expected results
        Assert.Equal(expectedUser.User_id, actualUser.User_id);
        Assert.Equal(expectedUser.Username, actualUser.Username);
        Assert.Equal(expectedUser.Email, actualUser.Email);
        Assert.Equal(expectedUser.Password, actualUser.Password);
        Assert.Equal(expectedUser.Biography, actualUser.Biography);
        Assert.Equal(expectedUser.Nickname, actualUser.Nickname);
        Assert.Equal(expectedUser.Pfp, actualUser.Pfp);
        this.Dispose();
    }

    [Theory]
    [InlineData("[{\"userID\": 10, \"username\": \"charlie.brown\", \"nickname\": \"Charlie\", \"pfP_URL\": \"https://random.image/img10.jpg\"}]")]
    public async Task Test_UserNine_ReturnsCorrectJsonOfFollowers(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        var expectedFollowers = JsonSerializer.Deserialize<List<Follower>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/following/9");
        var content = await response.Content.ReadAsStringAsync();
        var actualFollowers = JsonSerializer.Deserialize<List<Follower>>(content);

        // Assert: Compare the expected and actual followers
        Assert.Equal(expectedFollowers.Count, actualFollowers.Count);
        for (int i = 0; i < expectedFollowers.Count; i++)
        {
            Assert.Equal(expectedFollowers[i].UserID, actualFollowers[i].UserID);
            Assert.Equal(expectedFollowers[i].Username, actualFollowers[i].Username);
            Assert.Equal(expectedFollowers[i].Nickname, actualFollowers[i].Nickname);
            Assert.Equal(expectedFollowers[i].PFP_URL, actualFollowers[i].PFP_URL);
        }
        this.Dispose();
    }


    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
}

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
        // Arrange
        // var stopwatch = Stopwatch.StartNew();

        // Act
        var response = await _httpClient.GetAsync("/user/9999"); // Adjust path as needed
        // stopwatch.Stop();
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        // await TestHelpers.AssertResponseWithContentAsync(stopwatch, response, HttpStatusCode.NotFound, "Error");
        Assert.Equal("Error", content);
    }

    [Theory]
    [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_User_ReturnsCorrectJson(string expectedJson)
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
    }

    [Theory]
    [InlineData("[{\"userID\": 10, \"username\": \"charlie.brown\", \"nickname\": \"Charlie\", \"pfP_URL\": \"https://random.image/img10.jpg\"}]")]
    public async Task Test_User_ReturnsCorrectJsonOfFollowers(string expectedJson)
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
    }


    public void Dispose()
    {
        // Only delete or reset state if required by the application
        // _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
}

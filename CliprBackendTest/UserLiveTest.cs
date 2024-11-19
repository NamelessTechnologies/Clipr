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
        var response = await _httpClient.GetAsync("/user/followers/9999"); // Adjust path as needed
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
        var response = await _httpClient.GetAsync("/user/friendsof/9999"); // Adjust path as needed
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

// ----------------- EXPECTING OUTPUT -----------------
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
    public async Task Test_UserNine_ReturnsCorrectJsonOfFollowing(string expectedJson)
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

    [Theory]
    [InlineData("[{\"userID\": 9, \"username\": \"samantha_lee\", \"nickname\": \"FitSamantha\", \"pfP_URL\": \"https://random.image/img9.jpg\"}]")]
    public async Task Test_UserTen_ReturnsCorrectJsonOfFollowers(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        var expectedFollowers = JsonSerializer.Deserialize<List<Follower>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/followers/10");
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

    [Theory]
    [InlineData("[{\"postID\": 4, \"userID\": 4, \"title\": \"Tech Innovations 2024\", \"description\": \"An in-depth look at upcoming technological trends for the next year.\", \"datePosted\": \"2024-01-05T00:00:00\", \"mediaType\": \"video\"}]")]
    public async Task Test_UserOne_ReturnsCorrectJsonOfSaved(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into a List<Follower> object
        var expectedPosts = JsonSerializer.Deserialize<List<Post>>(expectedJson);

        // Act: Call the API to get the actual result
        var response = await _httpClient.GetAsync("/user/1/saved");
        var content = await response.Content.ReadAsStringAsync();
        var actualPosts = JsonSerializer.Deserialize<List<Post>>(content);

        // Assert: Compare the expected and actual followers
        Assert.Equal(expectedPosts.Count, actualPosts.Count);
        for (int i = 0; i < expectedPosts.Count; i++)
        {
            Assert.Equal(expectedPosts[i].PostID, actualPosts[i].PostID);
            Assert.Equal(expectedPosts[i].UserID, actualPosts[i].UserID);
            Assert.Equal(expectedPosts[i].Title, actualPosts[i].Title);
            Assert.Equal(expectedPosts[i].Description, actualPosts[i].Description);
            Assert.Equal(expectedPosts[i].DatePosted, actualPosts[i].DatePosted);
            Assert.Equal(expectedPosts[i].MediaType, actualPosts[i].MediaType);
        }
        this.Dispose();
    }

    [Theory]
    [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_UserOneEmail_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into an object
        var expectedUser = JsonSerializer.Deserialize<User>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/email/jpalonzo@cpp.edu");
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
    [InlineData("{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}")]
    public async Task Test_UserOneUsername_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into an object
        var expectedUser = JsonSerializer.Deserialize<User>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/username/alonzojp");
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
    [InlineData("[{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": null, \"password\": null, \"biography\": null, \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}]")]
    public async Task Test_UserOneSearchNameAlonzo_ReturnsCorrectJson(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into an object
        var expectedUsers = JsonSerializer.Deserialize<List<User>>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/searchname/alonzo");
        var content = await response.Content.ReadAsStringAsync();
        var actualUsers = JsonSerializer.Deserialize<List<User>>(content);

        // Assert: Compare the actual and expected results
        Assert.Equal(expectedUsers.Count, actualUsers.Count);
        for (int i = 0; i < expectedUsers.Count; i++)
        {
            Assert.Equal(expectedUsers[i].User_id, actualUsers[i].User_id);
            Assert.Equal(expectedUsers[i].Username, actualUsers[i].Username);
            Assert.Equal(expectedUsers[i].Email, actualUsers[i].Email);
            Assert.Equal(expectedUsers[i].Password, actualUsers[i].Password);
            Assert.Equal(expectedUsers[i].Biography, actualUsers[i].Biography);
            Assert.Equal(expectedUsers[i].Nickname, actualUsers[i].Nickname);
            Assert.Equal(expectedUsers[i].Pfp, actualUsers[i].Pfp);
        }

        this.Dispose();
    }

    [Theory]
    [InlineData("[{\"user_id\": 1, \"username\": \"alonzojp\", \"email\": \"jpalonzo@cpp.edu\", \"password\": \"password123\", \"biography\": \"I love CS!\", \"nickname\": \"Ender\", \"pfp\": \"https://i.pinimg.com/originals/6f/bd/2e/6fbd2e62dddb28723603aace97f9ac67.jpg\"}, {\"user_id\": 19, \"username\": \"chrisjlo\", \"email\": \"cjlo@cpp.edu\", \"password\": \"Password123\", \"biography\": \"My middle name is Ji-Chek!\", \"nickname\": \"cheky\", \"pfp\": \"http://chris.png\"}]")]
    public async Task Test_FriendsofUserTwo_ReturnsCorrectJsonArray(string expectedJson)
    {
        // Arrange: Deserialize the expected JSON into an object
        var expectedUsers = JsonSerializer.Deserialize<List<User>>(expectedJson);

        // Act: Call the API to get the actual result 
        var response = await _httpClient.GetAsync("/user/friendsof/2");
        var content = await response.Content.ReadAsStringAsync();
        var actualUsers = JsonSerializer.Deserialize<List<User>>(content);

        // Assert: Compare the actual and expected results
        Assert.Equal(expectedUsers.Count, actualUsers.Count);
        for (int i = 0; i < expectedUsers.Count; i++)
        {
            Assert.Equal(expectedUsers[i].User_id, actualUsers[i].User_id);
            Assert.Equal(expectedUsers[i].Username, actualUsers[i].Username);
            Assert.Equal(expectedUsers[i].Email, actualUsers[i].Email);
            Assert.Equal(expectedUsers[i].Password, actualUsers[i].Password);
            Assert.Equal(expectedUsers[i].Biography, actualUsers[i].Biography);
            Assert.Equal(expectedUsers[i].Nickname, actualUsers[i].Nickname);
            Assert.Equal(expectedUsers[i].Pfp, actualUsers[i].Pfp);
        }

        this.Dispose();
    }

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
}

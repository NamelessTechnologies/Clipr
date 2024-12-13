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

public class ConversationLiveTest : IDisposable
{
    private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5001") };

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
    
    // ------------------------------ EXPECTING NOTFOUND ------------------------------
    [Fact]
    public async Task GetConvoPageInfoByUserId_ReturnsNotFoundWhenUserDoesntExist()
    {
        // Act
        var response = await _httpClient.GetAsync("/Conversation/getConvoPageInfo/0");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "No conversations found";

        // Assert
        Assert.Equal(noneResult, content);

        this.Dispose();
    }

    [Fact]
    public async Task GetAllConvoMessagesByUserIds_ReturnsNotFoundWhenUsersDoesntExist()
    {
        // Act
        var response = await _httpClient.GetAsync("/Conversation/");
        var content = await response.Content.ReadAsStringAsync();
        var noneResult = "No messages for convo";

        // Assert
        Assert.Equal(noneResult, content);

        this.Dispose();
    }

    [Theory]
    [InlineData("{\"Id\":null,\"User_id\":null,\"User_id_2\":null}")]
    public async Task GetConvoIdByUserIds_ReturnsNotFoundWhenIdsDontExist(string expectedJson)
    {
        
        // Act
        var response = await _httpClient.GetAsync("/Conversation/convoid");
        var content = await response.Content.ReadAsStringAsync();
        var actualConvo =  JsonSerializer.Deserialize<Conversation>(content);
        var actualString = JsonSerializer.Serialize(actualConvo);

        // Assert
        Assert.Equal(expectedJson, actualString);

        this.Dispose();
    }

    // ------------------------------ EXPECTING SOMETHING ------------------------------

    [Fact]
    public async Task GetConvoPageInfoByUserId_ReturnsSomething()
    {
        // Act
        var response = await _httpClient.GetAsync("/Conversation/getConvoPageInfo/1");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.NotNull(content);

        this.Dispose();
    }

    [Theory]
    [InlineData("{\"User_1\":1,\"User_2\":2}")]
    public async Task Test_GetAllConversationMessagesByUserIds_ReturnsSomething(string messagesQuery) 
    {
        var requestContent = new StringContent(
            JsonSerializer.Serialize(messagesQuery),
            Encoding.UTF8,
            "application/json"
        );

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(_httpClient.BaseAddress + "/Conversation/"),
            Content = requestContent
        };
        var response = await _httpClient.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);

        // Assert
        Assert.NotNull(content);

        this.Dispose();
    }

    [Theory]
    [InlineData("{\"User_1\":1,\"User_2\":2}")]
    public async Task Test_GetConvoIdByUserIds_ReturnsSomething(string messagesQuery) 
    {
        var requestContent = new StringContent(
            JsonSerializer.Serialize(messagesQuery),
            Encoding.UTF8,
            "application/json"
        );

        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(_httpClient.BaseAddress + "/Conversation/convoid/"),
            Content = requestContent
        };
        var response = await _httpClient.SendAsync(request);
        var content = await response.Content.ReadAsStringAsync();
        Console.WriteLine(content);

        // Assert
        Assert.NotNull(content);

        this.Dispose();
    }
}
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

public class TestDataLiveTest : IDisposable
{
    private readonly HttpClient _httpClient = new() { BaseAddress = new Uri("http://localhost:5001") };

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }

    [Fact]
    public async Task GetAllTestDataUsers_ReturnsSomething()
    {
        // Act
        var response = await _httpClient.GetAsync("/TestData/user");
        var content = await response.Content.ReadAsStringAsync();

        // Assert
        Assert.NotNull(content);

        this.Dispose();
    }

}
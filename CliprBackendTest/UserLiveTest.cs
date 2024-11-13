namespace CliprBackendTest;

using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Diagnostics;
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

        // Assert using TestHelpers
        // await TestHelpers.AssertResponseWithContentAsync(stopwatch, response, HttpStatusCode.NotFound, "Error");
        Assert.Equal("Error", content);
    }

    public void Dispose()
    {
        // Only delete or reset state if required by the application
        // _httpClient.DeleteAsync("/state").GetAwaiter().GetResult(); 
    }
}

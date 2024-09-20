using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;
using DotNetEnv;

namespace backend.Controllers;

public sealed class DBConn
{
    private static DBConn? _instance = null;
    private static readonly object _lock = new object();
    private DBConn() {}
    private NpgsqlConnection conn { get; set;}

/**
 * <summary>
 *    This construction only makes a DB connection if one doesn't exist yet.
 * </summary>
 */
    public static DBConn Instance()
    {
        if (_instance == null)
        {
            lock (_lock)
            {
                if (_instance == null)
                {
                    _instance = new DBConn();
                    Env.Load();
                    string? host = Environment.GetEnvironmentVariable("HOST");
                    string? username = Environment.GetEnvironmentVariable("USERNAME");
                    string? pass = Environment.GetEnvironmentVariable("PWD");
                    string? database = Environment.GetEnvironmentVariable("DB");
                    Console.WriteLine(host);
                    Console.WriteLine(username);
                    Console.WriteLine(pass);
                    Console.WriteLine(database);
                    
                    // Define your connection string (replace with your actual values)
                    var connString = $"Host={host};Username={username};Password={pass};Database={database}";

                    _instance.conn = new NpgsqlConnection(connString);

                }
            }
        }
        return _instance;
    }

/**
 * <summary>
 *    This function returns the current connection.
 * </summary>
 */
    public NpgsqlConnection getConn() {
        if (_instance == null) {
            throw new Exception("Conn does not exist!");
        }
        return _instance.conn;
    }
}
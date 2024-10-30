// using backend.Models;
// using Microsoft.AspNetCore.Mvc;
// using System;
using Npgsql;
// using DotNetEnv;

namespace backend.Controllers;
public class DBConn
{
    private const string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database;Pooling=true;MaxPoolSize=5;";

    public static NpgsqlConnection GetConn()
    {
        NpgsqlConnection conn = new NpgsqlConnection(connString);   
        return conn;
    }

    public static void CloseConn(NpgsqlConnection conn)
    {
        conn.Close();
    }
}
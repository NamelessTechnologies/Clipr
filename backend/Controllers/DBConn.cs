using backend.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using Npgsql;

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

                    // Define your connection string (replace with your actual values)
                    var connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";

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
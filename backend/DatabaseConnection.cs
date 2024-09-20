using Microsoft.VisualBasic;
using Npgsql;

public class DatabaseConnection {

    private string connString = "Host=clipr-pg.postgres.database.azure.com;Username=clipr_admin;Password=password123!;Database=clipr_database";
    NpgsqlConnection conn;

    public DatabaseConnection() {
        conn = new NpgsqlConnection(connString);
    }

    public NpgsqlDataReader execute(string query) { 

        conn.Open();
        using var cmd = new NpgsqlCommand(query, conn);
        var result = cmd.ExecuteReader();

        conn.Close();
        return result;
    }
}
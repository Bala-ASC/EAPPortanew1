using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace EAPAccess.DAL
{
    public class BaseRepository : IDisposable
    {
        public readonly string _connectionString = string.Empty;
        public string ConnectionString
        {
            get => _connectionString;
        }

        protected IDbConnection con;
        public BaseRepository()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("ConnectionStrings").GetSection("EAPDBConnection").Value;

            con = new SqlConnection(_connectionString);
        }
        public void Dispose()
        {
            //throw new NotImplementedException();  
        }
    }
}

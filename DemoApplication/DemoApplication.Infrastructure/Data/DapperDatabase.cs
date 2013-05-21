namespace DemoApplication.Infrastructure.Data
{
    using System;
    using System.Configuration;
    using System.Data.Common;
    using System.Data.SqlClient;

    public class DapperDatabase : IDisposable
    {
        private readonly DbConnection _connection;

        public DapperDatabase()
        {
            _connection = new SqlConnection(ConfigurationManager.ConnectionStrings["Local"].ConnectionString);
            Connection.Open();
        }

        public DbConnection Connection
        {
            get { return _connection; }
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}

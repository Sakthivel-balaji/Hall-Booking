exports.dbConnection = function () {
  var dbConfig = {
      user: "sa1", // SQL Server Login
      password: "password", // SQL Server Password
      server: "localhost", // SQL Server Server name
      database: "hallbookingDB", // SQL Server Database name
      port: 1433
  };
  return dbConfig;
};
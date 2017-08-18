var mysql = require('mysql');
var fs = require('fs');

exports.initDB = function (mysqlConfig) {
  mysqlConfig.multipleStatements = true
  let dbPool = mysql.createPool(mysqlConfig);

  dbPool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error connecting to the database pool: ' + err.stack)
      return;
    }
    console.log('initializing the database')
    var sql = fs.readFileSync('./db/createUsers.sql').toString();
    console.log(sql)
    connection.query(sql, function (dbInitError, results, fields) {
      if (dbInitError) {
        console.error('Failed initialising the DB - ' + dbInitError.stack)
        return
      } else {
        console.log('Successfully inititialised the DB')
        dbPool.end()
      }
    })
  })
}

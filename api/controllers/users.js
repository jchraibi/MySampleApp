'use strict';

module.exports = {
  getAllUsers: getAllUsers
};

function getAllUsers(req, res) {
  console.log("getting all users")
  getAllUsersLegacy(req.dbPool).then((results) => {
    return res.json(results)
  }, (error) => {
    return res.status(503).json(error)
  })
}

function getAllUsersLegacy(dbPool) {
  console.log("legacy implementation for getting all users")
  return new Promise(
    (resolve, reject) => {
      dbPool.getConnection(function(connectionError, connection) {
        if (connectionError) {
          console.error('Error retrieving a connection from the pool: ' + err.stack)
          return res.status(503).json({'message' : 'Database error'})
        } else {
          connection.query('SELECT first as firstname, last as lastname, email FROM users',  (error, results, fields) => {
            if (error) {
              console.error('Error retrieving users from the database: ' + error.stack)
              reject({
                'message' : 'Database error'
              })
            } else {
              connection.release()
              resolve(results)
            }
          })
        }
      })
    }
  )
}

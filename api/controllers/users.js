'use strict';

const science = require('../scientist/console');

module.exports = {
  getAllUsers: getAllUsers
};

function getAllUsers(req, res) {
  console.log("getting all users")
  var experimentResult = science('Get All Users', (experiment) => {
    experiment.async(true)
    experiment.context({ 'name':  'Get All Users'});
    experiment.use(() => getAllUsersLegacy(req.dbPool))
    // Experimenting with the temp gh-ost db
    experiment.try(() => getAllUsersNew(req.dbPool, '_users_gho'))

    experiment.compare((a, b) => {
      if(JSON.stringify(a) === JSON.stringify(b)) {
        return true
      } else {
        return false
      }
    })

  })

  experimentResult.then(function(result) {
    return res.json(result);
  }, function(error) {
    return res.status(503).json(error);
  })
}

function getAllUsersLegacy(dbPool) {
  console.log("Legacy implementation for getting all users")
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


function getAllUsersNew(dbPool, table) {
  console.log("New implementation for getting all users")
  return new Promise(
    (resolve, reject) => {
      dbPool.getConnection(function(connectionError, connection) {
        if (connectionError) {
          console.error('Error retrieving a connection from the pool: ' + err.stack)
          return res.status(503).json({'message' : 'Database error'})
        } else {
          connection.query('SELECT firstname, lastname, email FROM ' + table,  (error, results, fields) => {
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

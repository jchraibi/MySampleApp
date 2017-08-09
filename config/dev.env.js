var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  autoOpenBrowser: false,
  db: {
    connectionLimit: 10,
    acquireTimeout: 10000,
    host: '127.0.0.1',
    port: 3360,
    user: 'gh-ost',
    password: 'gh-ost',
    database: 'gh-ost'
  }
})

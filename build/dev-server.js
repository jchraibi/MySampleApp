require('./check-versions')()

var config = require('../config')

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' || 'production'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')
var mysql = require('mysql')
var dbUtil = require('./db-util')
var SwaggerExpress = require('swagger-express-mw')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let mysqlConfig = config.dev.env.db
if (process.env.NODE_ENV === 'production') {
  mysqlConfig.connectionLimit = process.env.MYSQL_CONNECTION_LIMIT || 10
  mysqlConfig.acquireTimeout = process.env.MYSQL_ACQUIRE_TIMEOUT || 1000
  mysqlConfig.host = process.env.MYSQL_CONNECTION_HOST
  mysqlConfig.port = process.env.MYSQL_CONNECTION_PORT || 3306
  mysqlConfig.user = process.env.MYSQL_CONNECTION_USER
  mysqlConfig.password = process.env.MYSQL_CONNECTION_PASSWORD
  mysqlConfig.database = process.env.MYSQL_CONNECTION_DATABASE
}

let dbPool = mysql.createPool(mysqlConfig);
dbPool.getConnection(function(err, connection) {
  if (err) {
    console.error('Error connecting to the database pool: ' + err.stack)
    return;
  }

  connection.query('SELECT 1', function (error, results, fields) {
    if (err) {
      console.error('Error querying the database: ' + err.stack)
      return
    } else {
      console.log('Successfully connected to the database')
      dbUtil.initDB(mysqlConfig)
    }
  })
})

app.use(function (req, res, next) {
  req.dbPool = dbPool
  next()
})

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')

var swagggerConfig = {
  appRoot: __dirname + '/..', // required config
  swaggerSecurityHandlers: {
    UserSecurity: function securityHandler1(req, authOrSecDef, scopesOrApiKey, cb) {
      cb();
    }
  }
}

SwaggerExpress.create(swagggerConfig, function(err, swaggerExpress) {
  if (err) {
    throw err
  }

  swaggerExpress.register(app)

  server = app.listen(port)

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl -H "Accept: application/json" http://127.0.0.1:' + port + '/api/hello?name=Scott')
  }

  if (autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})


devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
})


module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

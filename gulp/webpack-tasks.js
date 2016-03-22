var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var frontendConfig = require('./../webpack.frontend.js');
var backendConfig = require('./../webpack.backend.js');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var Server = require('./server');

function handleWebpackError(err, stats) {
  if(err)
    throw err;
  var jsonStats = stats.toJson();
  if(jsonStats.errors.length > 0)
    throw err;
  if(jsonStats.warnings.length > 0)
    console.error(warnings);
}


function onBuild(done) {
  return function(err, stats) {
    handleWebpackError(err, stats);

    if(done) {
      done();
    }
  }
}

function createHotReloadMiddlewares() {
  var compiler = webpack(frontendConfig);

  return [
    webpackDevMiddleware(compiler, { 
      noInfo: true, 
      publicPath: frontendConfig.output.publicPath }),
    webpackHotMiddleware(compiler)
  ];
}

function buildFrontend(done) {
  webpack(frontendConfig).run(onBuild(done));
}

function watchFrontend(done) {
  webpack(frontendConfig).run(500, onBuild(done));
}

function buildBackend(done) {
  webpack(backendConfig).run(onBuild(done));
}

function watchBackend(done) {
  var server = new Server();
  webpack(backendConfig).watch(500, function(err, stats) {
    server.restart(middlewares, done);
  });
}

/**
 * Run server and inject the frontend hot module middlewares
 * @param  {Function} done
 */
function serve(done) {
  var server = new Server();
  var middlewares = createHotReloadMiddlewares();
  webpack(backendConfig).watch(500, function(err, stats) {
    server.restart(middlewares, done);
  });
}

module.exports = {
	buildFrontend,
	buildBackend,

	watchFrontend,
	watchBackend,

	serve
}
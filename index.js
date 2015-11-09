module.exports = function (options, apps, routes) {

  var async = require('async');
  var derby = require('derby');

  var http  = require('http');
  var chalk = require('chalk');

  derby.run(function () {

    require('coffee-script/register');

    var config = require('./server/config')(options);

    apps = apps || [];

    var express = require('./server/express');
    var store = require('./server/store')(derby, config);
    var error = require('./server/error');

    express(config, apps, routes, store, error, function (expressApp, upgrade) {

      var server = http.createServer(expressApp);

      server.on('upgrade', upgrade);

      async.each(apps, bundleApp, function () {
        server.listen(process.env.PORT, process.env.SERVER_IP, function () {

          console.log(
            '%d listening. Go to: http://%d:%d/',
            process.pid, process.env.SERVER_IP, process.env.PORT
          );
        });
      });

      function bundleApp (app, cb) {
        app.writeScripts(store, config.path.public, {extensions: ['.coffee']}, function (err) {

          if (err) {

            console.log("Bundle don't created:", chalk.red(app.name), ', error:', err);

          } else {

            console.log('Bundle created:', chalk.blue(app.name));
          }
          cb();
        });
      }

    });
  });
};
